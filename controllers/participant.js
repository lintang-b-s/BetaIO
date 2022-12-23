import {
  
    signinParticipant,
    getAllEvents,
    getOneEvent,
    getAllOrders,
    checkoutOrder,
    getAllPaymentByOrganizer,
    buktiPayment
  } from '../../../services/mongoose/participants.js';
import { StatusCodes } from 'http-status-codes';


  

  

  
  const getDashboard = async (req, res, next) => {
    try {
      const result = await getAllOrders(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  

  const getAllPayment = async (req, res, next) => {
    try {
      const result = await getAllPaymentByOrganizer(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const checkout = async (req, res, next) => {
    try {
      const result = await checkoutOrder(req);
  
      res.status(StatusCodes.CREATED).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };





export { getDashboard, getAllPayment, checkout};