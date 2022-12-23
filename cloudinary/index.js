import dotenv from 'dotenv';
import cloudin from 'cloudinary';
const cloudinary = cloudin.v2;
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';
if (process.env.NODE_ENV !== "production") {
const __dirname = path.resolve();
dotenv.config({
    path: path.resolve(__dirname, '.env')
  })
}

// dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'MapI/O',
        allowedFormats: ['jpg', 'jpeg', 'png']
    }
});

export { cloudinary, storage };

