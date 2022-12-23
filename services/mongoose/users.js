import User from '../../models/user.js';
import { otpMail } from "../mail/index.js"

import BadRequest from '../../errors/bad-request.js';


const createUsers = async (req, res) => {
  const { name, password, role, confirmPassword, email } = req.body;
  console.log('req body: ', req.body)
  if (password !== confirmPassword) {
    throw new BadRequest('Password dan Konfirmasi password tidak cocok');
  }

  const result = await User.create({
    name,
    email,
    password,
    role,
    otp: Math.floor(Math.random() * 9999),
  });
  console.log('result: ', result);

  await otpMail(email, result);
  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find();

  return result;
};

export { createUsers, getAllUsers };
