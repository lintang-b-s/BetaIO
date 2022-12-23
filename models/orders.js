import mongoose, { mongo } from "mongoose";

const ticketCategoriesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Tipe tiket harus diisi'],
  },
  price: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date
  },
  ticketId: {
    type: mongoose.Types.ObjectId,
    ref: 'Ticket',
  }
})

const orderDetailSchema = new mongoose.Schema({
    ticketCategories: {
      type: ticketCategoriesSchema 
    },
    sumTicket: {
      type: Number,
      required: true,
    },
  });

const ImageSchema = new mongoose.Schema({
    url: String,
    filename: String
});

const opts = { toJSON: { virtuals: true } };


const orderSchema = new mongoose.Schema(
    {
      date: {
        type: Date,
        required: true,
      },
      dueDate: {
        type: Date,
      },
      personalDetail: {
        firstName: {
          type: String,
          required: [true, 'Please provide firstName'],
          minlength: 3,
          maxlength: 50,
        },
        lastName: {
          type: String,
          required: [true, 'Please provide lastName'],
          minlength: 3,
          maxlength: 50,
        },
        email: {
          type: String,
          required: [true, 'Please provide email'],
        },
        role: {
          type: String,
          default: 'Back End Engineer',
        }
      },
      totalPay: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending',
      },
      image: [ImageSchema]
      ,
      totalOrderTicket: {
        type: Number,
        required: true,
      },
      orderItems: [orderDetailSchema],
      participant: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true, 
      },
      place: {
        type: mongoose.Types.ObjectId,
        ref: 'Place',
        required: true,
      },
      payment: {
        type: mongoose.Types.ObjectId,
        ref: 'Payment',
        required: true,
      },
      historyPlace: {
        title:{
            type: String,
            required: [true, 'nama tempat harus diisi']
        },
        images:[ImageSchema],
        
        geometry: {
            type: {
              type: String, 
              enum: ['Point'],
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
          }, 
        placeType: String,
        
        description: String,
        location: String,
        flora: String,
        fauna: String,
        makanan: String,
        sumberAir: Boolean,
        habitant: String,
       
        author:  { 
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      },

      }
      
    }, opts, { timestamps: true },
    { typeKey: '$type' }
  );


const Order = mongoose.model('Order', orderSchema);
export default Order;