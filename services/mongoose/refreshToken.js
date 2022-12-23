import UserRefreshToken from '../../models/userRefreshToken.js';

import {isTokenValidRefreshToken, createJWT} from "../../utils/jwt.js";
import { createTokenUser } from '../../utils/createTokenUser.js';






import Users from '../../models/user.js';
import NotFoundError from "../../errors/not-found.js";

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshToken.create(payload);

  return result;
};

const getUserRefreshToken = async (req) => {
  
  const { refreshToken } = req.params;
  
  const result = await UserRefreshToken.findOne({
    refreshToken,
  });

  if (!result) throw new NotFoundError(`refreshToken tidak valid `);

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  const userCheck = await Users.findOne({ email: payload.email });

  const token = createJWT({ payload: createTokenUser(userCheck) });

  return token;
};


const newUserAccessToken = async (req) => {
  console.log('req.session.refreshToken: ', req.session.refreshToken)
  
  const { refreshToken } = req.session.refreshToken;

  
  const result = await UserRefreshToken.findOne({
    refreshToken,
  });

  if (!result) throw new NotFoundError(`refreshToken tidak valid `);

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  const userCheck = await Users.findOne({ email: payload.email });

  const token = createJWT({ payload: createTokenUser(userCheck) });

  return token;
};

const deleteRefreshToken = async (req) => {
  console.log('refresh token: pas di deleterefreshtoken function:  ', req.session.refreshToken)
  
  const refreshToken  = req.session.refreshToken;
  
  const result = await UserRefreshToken.findOne({
    refreshToken,
  });

  console.log('result: ', result.refreshToken )

  if (!result) throw new NotFoundError(`refreshToken tidak valid `);

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  const deleting  = await UserRefreshToken.deleteOne({
    refreshToken
  })

  
};

export { createUserRefreshToken, getUserRefreshToken,  newUserAccessToken, deleteRefreshToken  };
// deleteRefreshToken,
