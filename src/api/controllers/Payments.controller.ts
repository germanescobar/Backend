import { Request, Response, NextFunction } from 'express';
import { Payments } from '../service/Payments.service';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

export class PaymentsController {
  constructor() {}

  static async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user;
      const { paymentMethod, cart, amount } = req.body;
      const { orderId } = await Payments.processPayment({ paymentMethod, cart, amount, userId });
      res.status(200).json({ id: orderId });
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.BadRequest());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }
}
