import StatusCodes from 'http-status-codes';
import {
    getUserRefreshToken
} from '../services/mongoose/refreshToken.js';



const index = async (req, res, next) => {
    try {
      const result = await getUserRefreshToken(req);
  
      res.status(StatusCodes.OK).json({
        data: { token: result },
      });
    } catch (err) {
      console.log('err');
      console.log(err);
      next(err);
    }
  };


export { index } ;
