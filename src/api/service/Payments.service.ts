import stripe from '../../config/stripe/stripe.config';
import { Prisma } from '@prisma/client';
import { IPayment } from '../interfaces/Payment.interface';
import { Orders } from './Orders.service';
import { Products } from './Products.service';
import { Notifications } from './Notifications.service';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCodes.utils';
import logger from '../../config/logger/winston.logger';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

export class Payments {
  constructor() {}

  static async processPayment({ paymentMethod, cart, amount, userId }: IPayment) {
    try {
      const { id } = paymentMethod;
      const card = paymentMethod.card;
      const { status: state, id: paymentId } = await stripe.paymentIntents.create({
        currency: 'USD',
        payment_method: id,
        amount: amount,
      });
      const order = {
        userId,
        cart,
        amount,
        card,
        state,
      };
      const { id: orderId, productsData } = await Orders.createOrder(order);
      if (orderId) {
        const { status } = await stripe.paymentIntents.confirm(paymentId);
        await Orders.confirmOrder(orderId, status);
        await Notifications.sendEmail(userId, orderId);
        if (productsData) {
          await Products.updateProductStock(productsData);
        }
        return { orderId };
      }
      throw ApiError.Internal('Something went wrong with your purchase please call your nearest dev!');
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error at payment process');
    }
  }
}
