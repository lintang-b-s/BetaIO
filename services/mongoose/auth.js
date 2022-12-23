import User from '../../models/user.js' ;

import UnauthenticatedError from '../../errors/unauthenticated.js';
import Unauthorized from '../../errors/unauthorized.js';
import BadRequest from '../../errors/bad-request.js';

import { createTokenUser }  from '../../utils/createTokenUser.js';
import { createJWT,createRefreshJWT, isTokenValidRefreshToken  }from '../../utils/jwt.js';

import { createUserRefreshToken } from './refreshToken.js' ;
const signin = async (req) => {
  console.log('halo dunia')
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest('Please provide email and password');
  } 

  const result = await User.findOne({ email: email });
  console.log('result query find: ', result)

  if (!result) {
    throw new Unauthorized('Invalid Credentials');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new Unauthorized('Invalid Credentials');
  }
  const token = createJWT({ payload: createTokenUser(result) });

  const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });
  await createUserRefreshToken({
    refreshToken,
    user: result._id,
  });

  return { token, refreshToken, role: result.role, email: result.email };
};


// const signout= async (req) => {
  
  


// }


const activateUser = async (req) => {
  const email = req.params.email;
  const { otp } = req.body;
  const check = await User.findOne({
    email,
  });

  if (!check) throw new NotFoundError('Pengguna belum terdaftar');

  if (check && check.otp !== otp) throw new BadRequest('Kode otp salah');

  const result = await User.findByIdAndUpdate(
    check._id,
    {
      status: 'aktif',
    },
    { new: true }
  );

  delete result._doc.password;

  return result;
};

export { signin, activateUser };
