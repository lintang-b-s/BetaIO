import {Place, Ticket } from '../models/place.js';
import Order from "../models/orders.js"
import { cloudinary } from '../cloudinary/index.js';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js';
import dotenv from 'dotenv';
import path from 'path';
import { checkoutOrder , buktiPayment} from "../services/mongoose/participants.js";
import { createPayments } from "../services/mongoose/payments.js";
 
if (process.env.NODE_ENV !== "production") {

const __dirname = path.resolve();
dotenv.config({
    path: path.resolve(__dirname, '.env')
  })
};
import Payment from "../models/payments.js"
import { createECDH } from 'crypto';

const mapBoxToken = process.env.MAPBOX_TOKEN;

const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const index = async (req, res, next) => {
    try{const places = await Place.find({});
    res.render('places/index', { places });
    // res.status(200).json(places)
} catch(err) {
    console.log(err);
    next(err);
}

}

const renderNewForm = (req,res) => {
    res.render('places/new');
}

const createPlace = async(req, res, next) => {
    try{
      const result = new Ticket(req.body.tickets);
      await result.save();

    
    
    const place = new Place(req.body.place);
    console.log('result: ',result._id);
    place.tickets = result._id;
    // place.geometry = geoData.body.features[0].geometry;
    place.geometry.type = req.body.geometry.type;
    place.geometry.coordinates = req.body.geometry.coordinates;
    // place.geometry = req.body.place
    place.images = req.files.map(f => ({ url: f.path, filename: f.filename}));
    place.author = req.user.id;
    
    
    await place.save();
   

    res.redirect(`/places/${place._id}`);
    } catch (err) {
        console.log(err); 
        next(err);
    }

} 
 
const showPlace = async (req, res) => {
    const place = await Place.findById(req.params.id).populate('author').populate('tickets');
    const user = req.user;
    console.log('place: ', place)
    

    if(!place) {
      
        return res.redirect('/places'); 


    }
    req.session.redirectTo = `/places/${req.params.id}`
    // res.header('Access-Control-Allow-Origin', '*');
    res.render('places/show', { place, user });
}


const renderEditForm = async (req, res) => {  
    const place = await Place.findById(req.params.id);

    

    if(!place) {
       
        return res.redirect('/places');
    }
    
    const user = req.user;
    

    res.render('places/edit', { place });

}

const updatePlace = async(req, res) => {
    const { id } = req.params;
    const place = await Place.findByIdAndUpdate(id, {...req.body.place });
    place.geometry.type = req.body.geometry.type;
    place.tickets = req.body.tickets;
    place.geometry.coordinates = req.body.geometry.coordinates;
    console.log('userId updatePlace: ', req.user.id)

    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    place.images.push(...imgs);
    await place.save();
    if(req.body.deleteImages) {
        for(let filename of req.body.deleteImages) {
            cloudinary.uploader.destroy(filename);
        }
        await place.updateOne({$pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    res.redirect(`/places/${place._id}`);
}


const renderCheckout = async (req, res) => {  
  const ticketId = req.params.ticketId
  const place = await Place.findById(req.params.id).populate('author').populate('tickets');
  // const place = await Place.find({}).populate('author');
  

  
  
  
   
  const payments = await Payment.find({organizer: req.user.id});
  console.log('your payments: ', payments.length);
  if (payments.length == 0){
    res.redirect('/addPayment')
  }

  if(!place) {
    
      return res.redirect('/places');
  }
  
  const user = req.user;
  

  res.render('places/checkout', { place, payments });

}

const deletePlace = async(req,res) => {
    const { id } = req.params;
    const place = await Place.findByIdAndDelete(id);
   

    res.redirect('/places');
}

const checkout = async(req, res, next) => {
    try{
       if (!req.body.payment){ 
        res.redirect('/addPayment')
       }
        
        const {result, placeId}  = await checkoutOrder(req);

        res.status(201)
        // json({
        //     data: result,
        // });

        res.redirect(`/places/${placeId}/${result._id}/uploadPembayaran`);

    } catch (err) {
        console.log(err);
        next(err);
    }
}

const  createTickets = async (req, res, next) => {
  try{
    const result = new Ticket(req.body);
    await result.save();
    console.log('ticket: ',result)
    res.status(201)


    // res.status(201).json({
    //   data: result
    // })

  } catch(err) {
    console.log(err)
    next(err);
  }
}

const getAllPayment = async (req, res, next) => {
    try {
      const result = await getAllPaymentByUser(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

const renderUploadBuktiPembayaran = async(req, res, next) => {
  try{
    const order = await Order.findById(req.params.orderId).populate("participant")
      .populate("place").populate("payment").populate("historyPlace.author")
    console.log('order:', order)


    res.render('places/uploadBuktiPembayaran', { order });
  } catch(err) {
    console.log(err);
    next(err);
  }
}

  const uploadBuktiPayment = async (req, res, next) => {
    try{
      const result = await buktiPayment(req);
      // res.status(201).json({
      //   data: result,
      // });

      res.status(200);

      res.redirect(`/places`);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
 
export { index, renderNewForm, createPlace, showPlace, renderEditForm,updatePlace,deletePlace, 
  checkout, getAllPayment, uploadBuktiPayment,
renderCheckout,createTickets ,
renderUploadBuktiPembayaran};