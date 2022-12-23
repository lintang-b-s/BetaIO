

import express, { Router } from 'express';
import {
 
  userRegister, renderRegister, renderLogin,renderOTP, renderPayment ,
  renderLogout
} from '../controllers/user.js';

import {
  signinCms,
  activateUserCms,
  logoutUserCms,
  putAuthUserCms
} from "../controllers/auth.js"
import bodyParser from "body-parser";
import {create} from "../controllers/payments.js";
import  { authenticateUser, authorizeRoles } from "../middlewares/auth.js";


var router = express.Router();
router.use(bodyParser.json())
/* GET users listing. */



router.route('/login')
  .get(renderLogin)
  .post( signinCms);

router.route('/logout')
  .get(renderLogout)
  .delete(logoutUserCms)

router.route('/signup')
  .get(renderRegister)
  .post(userRegister);

router.route('/putAuth')
  .put(putAuthUserCms)

// pindah route nya pake button href="..."
router.route('/:email/activate')
  .get(renderOTP)
  .put(activateUserCms)

router.route('/addPayment')
  .get(authenticateUser, renderPayment)
  .put(authenticateUser,create);



export default router;

