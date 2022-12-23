import mongoose from "mongoose";

const userRefreshTokenSchema = new mongoose.Schema(
    {
      refreshToken: {
        type: String,
      },
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true }
  );

const UserRefreshToken = mongoose.model('UserRefreshToken', userRefreshTokenSchema);

export default UserRefreshToken;