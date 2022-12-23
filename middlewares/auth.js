
import UnauthenticatedError from '../errors/unauthenticated.js';
import Unauthorized from '../errors/unauthorized.js';
import  { isTokenValid,isTokenValidRefreshToken } from '../utils/jwt.js';
import { newUserAccessToken } from '../services/mongoose/refreshToken.js';
import User from '../models/user.js';

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    let refreshToken;
    // check header
    const authHeader = req.headers.authorization;

    // if (authHeader && authHeader.startsWith('Bearer')) {
    //   token = authHeader.split(' ')[1];
    // }

    // gak ada req.session sama sekali
    console.log('authHeader', authHeader)
    console.log('authHeader', req.session.accessToken);
    console.log('authHeader', req.session.refreshToken);

    token = req.session.accessToken;
    refreshToken= req.session.refreshToken;

    if (!token) {
      throw new UnauthenticatedError('Authentication invalid');
    }
    else if (!refreshToken){
      throw new UnauthenticatedError('Authentication invalid');
    }


    const payload = isTokenValid({ token });
    

    // Attach the user and his permissions to the req object
    if (payload) {
      // req.user = await User.findById()
      req.user = {
        email: payload.email,
        role: payload.role,
        name: payload.name,
        status: payload.status,
        id: payload.id,
      };
    }
    else {
      const result = await newUserAccessToken(req);
      req.session.accessToken = result.token;
      const payload = isTokenValid({ token });
      req.user = {
        email: payload.email,
        role: payload.role,
        name: payload.name,
        status: payload.status,
        id: payload.id,
      };
    }

    console.log("req user email: ", req.user.email)
    
    next();
  } catch (error) {
    next(error);
  }
};



const authorizeRoles = (...roles) => {
  return (req, res, next) => {
  
    if (!roles.includes(req.user.role)) {
      throw new Unauthorized('Unauthorized to access this route');
    }
    next();
  };
};

export { authenticateUser, authorizeRoles };
