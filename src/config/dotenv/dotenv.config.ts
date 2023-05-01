import { config } from 'dotenv';
import invariant from 'invariant';
config();

invariant(process.env.APP_PORT, 'A port must be declared');

export default {
  PORT: process.env.APP_PORT || 4545,
  SECRET_JWT: process.env.SECRET_JWT as string,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  ADMIN_KEY: process.env.ADMIN_KEY as string,
  STRIPE_KEY: process.env.STRIPE_KEY as string,
};
