import Stripe from 'stripe';
import env from '../dotenv/dotenv.config';

const stripe = new Stripe(env.STRIPE_KEY, { apiVersion: '2022-11-15' });

export default stripe;
