import cloudinary from 'cloudinary';
import 'dotenv/config';

cloudinary.config('api_key', process.env.CLOUDINARY_API_KEY);
cloudinary.config('api_secret', process.env.CLOUDINARY_API_SECRET);
cloudinary.config('cloud_name', process.env.CLOUDINARY_CLOUD_NAME);


export default cloudinary;
