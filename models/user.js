import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            default: '',
        },
        email: {
            type: String,
            default: '',
        },
        password: {
            type: String,
            default: ''
        },
        otp: {
            type: String,
        },
        role:{
            type: String,
            enum: ['admin', 'organizer', 'participant'],
            default: 'participant',
        },
        status: {
            type: String,
            enum: ['aktif', 'tidak aktif'],
            default: 'tidak aktif',
        }

    },
    { timestamps: true }
);


UserSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')) {
      User.password = await bcrypt.hash(User.password, 12);
    }
    next();
  });
  
UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};


const User =  mongoose.model("User", UserSchema);
export default User;

