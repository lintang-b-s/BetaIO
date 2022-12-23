import Order from "../../models/orders.js";
import { Place, Ticket } from "../../models/place.js";
import { ticketMail } from "../mail/index.js";


const getAllOrders = async (req) => {
  const { limit = 10, page = 1} = req.query;
  let condition = {};



  const result = await Order.find({}).populate("payment").populate("place").populate("participant").populate("payment")
    .limit(limit)
    .skip(limit * (page - 1));

  console.log('result: ', result)

  console.log('nama tempat: ', result[0].place.title)

  const count = await Order.countDocuments({});



  return { data: result, pages: Math.ceil(count / limit), total: count };
};

const approveOrder = async (req) => {
  const { id, placeId } = req.params;
   
  
  const order =await Order.findByIdAndUpdate(id, {status: 'paid'}).populate({
    path: 'orderItems',
    populate: {
      path: 'ticketCategories',
      select: "_id type price startDate endDate"
    }
}).populate("payment").populate("historyPlace.author").populate("place").populate("participant").populate("payment");
const ticketType  =order.orderItems[0].ticketCategories.type;

  // const ticket = await Place.findOne({ _id: placeId, 'tickets.type': ticketType, 'tickets.price':order.orderItems[0].ticketCategories.price, 'tickets.startDate': order.orderItems[0].ticketCategories.startDate,
  //   'tickets.endDate':  order.orderItems[0].ticketCategories.endDate});

  const ticketOrder = await Ticket.findById(order.orderItems[0].ticketCategories.ticketId)

  console.log('order ticket: ', order.place.name);



  const orderTicket = {
    order: order,
    ticket: ticketOrder,
    orderDate: function() {
      return order.date.toDateString()
    },
    startDate: function(){
      return ticketOrder.startDate.toDateString()
    },
    endDate: function(){
      return ticketOrder.endDate.toDateString()
    }
  }

  await order.save()
 
  await ticketMail(order.personalDetail.email, orderTicket);
 

  return order;
}



export  {
  getAllOrders,
  approveOrder
};
