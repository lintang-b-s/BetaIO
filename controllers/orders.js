import { getAllOrders,approveOrder } from "../services/mongoose/orders.js";

import { StatusCodes } from "http-status-codes";
import Order from "../models/orders.js";



const index = async (req, res, next) => {
    try {
      const result = await getAllOrders(req);
  
      // res.status(StatusCodes.OK).json({
      //   data: { order: result.data, pages: result.pages, total: result.total },
      // });
      const order = result.data;
      const pages = result.pages;
      const total = result.total;
      
      res.status(200);
      res.render('orders/listOrders', { order, pages, total })
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

const approvePayment = async (req, res, next) => {
  try{
    const  result = await approveOrder(req);

    // res.status(200).json({
    //   data: result
    // });
    res.status(200);
    res.redirect('/orders');
  } catch (err) {
    console.log(err);
    next(err);
  }
}


export { index, approvePayment};
