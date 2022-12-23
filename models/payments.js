import mongoose from "mongoose";

// gak ref ke organizer
const PaymentSchema = new mongoose.Schema(
    {
      type: {
        type: String,
        required: [true, 'Tipe pembayaran harus diisi'],
        minlength: 3,
        maxlength: 50,
      },
      status: {
        type: Boolean,
        enum: [true, false],
        default: true,
      },
      organizer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
      
    },
    { timestamps: true }
  );

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;
