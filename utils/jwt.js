import jwt from 'jsonwebtoken';
import {
  config
} from '../config.js';

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
  return token;
};
const createRefreshJWT = ({ payload }) => {
  const token = jwt.sign(payload, config.jwtRefreshTokenSecret, {
    expiresIn: config.jwtRefreshTokenExpiration,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, config.jwtSecret);
const isTokenValidRefreshToken = ({ token }) =>
  jwt.verify(token, config.jwtRefreshTokenSecret);

export {
  createJWT,
  isTokenValid,
  createRefreshJWT,
  isTokenValidRefreshToken,
};
