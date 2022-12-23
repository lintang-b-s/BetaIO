
import passport from "passport";

import localstorage from 'node-localstorage';
import { StatusCodes } from 'http-status-codes' ;
import { createUsers } from "../services/mongoose/users.js";
import User from "../models/user.js"
import { response } from "express";



const renderRegister = (req, res) => {
    res.render('users/register');
}

const renderLogout = (req,res) => {
    res.render('users/logout')
}

const renderLogin = (req, res) => {
    console.log('halo dunia')
    res.render('users/login');
}

const renderOTP = async(req,res) => {
    const userEmail = await User.findOne({ email: req.params.email}, 'email');
    console.log('email: ', userEmail)
    res.render('users/verifyUser', { userEmail })
}

const renderPayment = async(req, res) => {
    const userEmail = await User.findOne({email: req.user.email}, 'email');
    
    res.render('users/addPayment', { userEmail })

}

const userRegister = async (req, res, next) => {
   try {
      
        const result = await createUsers(req);
        console.log('user: ', result)
        res.status(StatusCodes.CREATED);
        await result.save()

        // res.redirect(`/users/login`);
        res.redirect(`/${ result.email }/activate`)
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const renderAfterLogin = (req, res, next) => {
    res.render('places/index')
}




export { userRegister, renderRegister, renderLogin, renderOTP, renderPayment, renderLogout };