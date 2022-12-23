import { signin, activateUser} from "../services/mongoose/auth.js";
import localstorage from 'node-localstorage';
import { StatusCodes } from "http-status-codes";
import { getUserRefreshToken, deleteRefreshToken, newUserAccessToken } from "../services/mongoose/refreshToken.js"



const signinCms = async (req, res, next) => {
    try {
      console.log('halo dunia')
      const result = await signin(req);//gagal nya di services signin ini pas setelah refreshtoken kehapus dari database

      console.log('refreshToken: ', req.session.refreshToken)
      
     
      req.session.accessToken = result.token;
      req.session.refreshToken = result.refreshToken;

      console.log('actoken: ', req.session.accessToken)
      
      // res.status(StatusCodes.CREATED).json({
      //   data: result,
      // });
      res.status(201);

      res.redirect(`/places`)
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

const logoutUserCms = async (req, res, next) => {
  try{
    
    await deleteRefreshToken(req);
    // const result = await signout(req);
    req.session.destroy();

    res.status(200);

    res.redirect(`/login`);



  }catch (err) {
    console.log(err);
    next(err);
  }
};

const putAuthUserCms = async(req, res, next) => {
  try{
    const result = await newUserAccessToken(req);
      req.session.accessToken = result.token;
      res.status(StatusCodes.OK).json({
        data: result,
      });
    }catch (err) {
      console.log(err);
      next(err);
    }
}

  const activateUserCms = async (req, res, next) => {
    try {
      const result = await activateUser(req);

      await result.save()
  
      res.status(StatusCodes.OK);
      res.redirect('/login')
    } catch (err) {
      next(err);
    }
  };





export { signinCms, activateUserCms, logoutUserCms, putAuthUserCms};
