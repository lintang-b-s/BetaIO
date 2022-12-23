
import { Place, Ticket}  from '../../models/place.js';
import Order  from '../../models/orders.js';
import Payment   from '../../models/payments.js';
import UnauthenticatedError from '../../errors/unauthenticated.js';
import  UnauthorizedError  from '../../errors/unauthorized.js';
import BadRequest from '../../errors/bad-request.js';
import NotFound from '../../errors/not-found.js';


import {  createJWT }  from '../../utils/jwt.js';

import {  invoiceMail, otpMail } from  '../mail/index.js';




const getAllOrder = async (req) => {

  const result = await Order.find({ participant: req.participant.id });
  return result;
};

/**R
 * Tugas Send email invoice
 * TODO: Ambil data email dari personal detail
 *  */
const checkoutOrder = async (req) => {
  // req.body: participant, place, personalDetail, payment, tickets

  
  const {  personalDetail, payment, tickets} = req.body;
  const placeId = req.params.id;

  const checkingPlace = await Place.findOne({ _id: placeId }).populate("tickets");
  if (!checkingPlace) {
    throw new NotFound('Tidak ada acara dengan id : ' + placeId);
  }

  const checkingPayment = await Payment.findOne({ _id: payment });

  if (!checkingPayment) {
    throw new NotFound(
      'Tidak ada metode pembayaran dengan id :' + payment
    );
  }

  let totalPay = 0,
    totalOrderTicket = 0;
  await tickets.forEach((tic) => {
    checkingPlace.tickets.forEach((ticket) => {
      console.log('ticket.startDate: ', (ticket.startDate) ) 
      console.log('tic.ticketCategories.startDate: ', tic.ticketCategories.startDate )
      if (tic.ticketCategories.type === ticket.type  && tic.ticketCategories.startDate == (ticket.startDate).toISOString().split('T')[0]  && tic.ticketCategories.endDate == (ticket.endDate).toISOString().split('T')[0]) {
        
        if (tic.sumTicket > ticket.stock) {
          throw new NotFound('Stock place tidak mencukupi');
        } else {
          ticket.stock -= tic.sumTicket;

          totalOrderTicket += tic.sumTicket;
          totalPay += tic.ticketCategories.price * tic.sumTicket;
        }
      }
    });
  });

  await checkingPlace.save();

  const historyPlaces = {
    title: checkingPlace.title,
    images: checkingPlace.images,
    geometry: checkingPlace.geometry,
    placeType: checkingPlace.placeType,
    description: checkingPlace.description,
    location: checkingPlace.location,
    tickets: tickets,
    flora: checkingPlace.flora,
    fauna: checkingPlace.fauna,
    makanan: checkingPlace.makanan,
    author: checkingPlace.author,
    sumberAir: checkingPlace.sumberAir,
    habitant: checkingPlace.habitant
  };

 
  var dateNow = new Date();
  const result = new Order({
    date: new Date(),
    personalDetail: personalDetail,
    totalPay,
    totalOrderTicket,
    orderItems: tickets,
    participant: req.user.id,
    place: placeId,
    historyPlace: historyPlaces,
    payment,
    dueDate: dateNow.setDate(dateNow.getDate() + 1)
  });
  await result.save();

  const orderQuery =await  Order.findById(result._id).populate({
    path: 'orderItems',
    populate: {
      path: 'ticketCategories',
      select: "_id type price startDate endDate"
      }
  }).populate("payment").populate("historyPlace.author").populate("place").populate("participant").populate("payment");

  const ticketOrder = await Ticket.findById(orderQuery.orderItems[0].ticketCategories.ticketId)

  console.log('result:', orderQuery)

  console.log('ticketquery: ', ticketOrder)


  const resultOrder = {
    order: orderQuery,
    ticket: ticketOrder,
    orderDate: function() {
      return  orderQuery.date.toGMTString()
    },
    dueDate: function(){
      return orderQuery.dueDate.toGMTString()
    },
    startDate: function(){
      return ticketOrder.startDate.toDateString()
    },
    endDate: function(){
      return ticketOrder.endDate.toDateString()
    }
   
  }

 
  await invoiceMail(personalDetail.email, resultOrder);

  
  return {result, placeId};
};

const buktiPayment = async (req) => {
  const order  = await Order.findByIdAndUpdate(req.params.orderId, { image: req.files.map(f => ({ url: f.path, filename: f.filename})) });
  if(req.body.deleteImages) {
    for(let filename of req.body.deleteImages) {
        cloudinary.uploader.destroy(filename);
    }
    await order.updateOne({$pull: { image: { filename: { $in: req.body.deleteImages } } } });
  }
  await order.save();
  return order;
}

const getAllPaymentByUser = async (req) => {
  const user = req.user.id;

  const result = await Payment.find({ id: user });

  return result;
};

export {

  getAllOrder,
  checkoutOrder,
  getAllPaymentByUser,
  buktiPayment
};
