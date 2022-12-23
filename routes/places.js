

import express from 'express';
const router = express.Router();
import  { index, renderNewForm, createPlace, showPlace, renderEditForm,updatePlace,deletePlace,checkout, 
    getAllPayment, uploadBuktiPayment,
    createTickets,
    renderUploadBuktiPembayaran,
renderCheckout } from '../controllers/places.js'
import catchAsync from '../utils/catchAsync.js';

import  { authenticateUser, authorizeRoles } from "../middlewares/auth.js"
import multer from "multer";
import { storage } from "../cloudinary/index.js";
import {  verifyAdmin, validatePlace, isAuthor} from "../middlewares/authenticate.js"

const upload = multer({ storage });








router.route('')
    .get(catchAsync(index))
    .post(authenticateUser, upload.array('image'), validatePlace, catchAsync(createPlace));

router.get('/new', authenticateUser, renderNewForm);

router.route('/:id')
    .get( authenticateUser, catchAsync(showPlace))
    .put(authenticateUser, isAuthor, upload.array('image'), validatePlace, catchAsync(updatePlace))
    .delete(authenticateUser, isAuthor, catchAsync(deletePlace)) 

 
router.get('/:id/edit', authenticateUser, isAuthor, catchAsync(renderEditForm));

router.get('/:id/:ticketId/checkout', authenticateUser,authorizeRoles('participant', 'organizer'), renderCheckout);

router.post('/:id/postcheckout', authenticateUser,authorizeRoles('participant', 'organizer'), checkout);

router.get('/:id/:orderId/uploadPembayaran', authenticateUser,authorizeRoles('participant', 'organizer'), renderUploadBuktiPembayaran);

router.put('/:id/checkout/:orderId',  authenticateUser,authorizeRoles('participant', 'organizer'),  upload.array('image'), uploadBuktiPayment);

router.post('/tickets', authenticateUser,authorizeRoles('participant', 'organizer'), createTickets)

export default router;



