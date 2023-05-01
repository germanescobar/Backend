import { Request, Response, NextFunction } from 'express';
import { Payments } from '../service/Payments.service';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

export class PaymentsController {
  constructor() {}

  static async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('h3lo');
      const { id: userId } = req.user;
      const { paymentMethod, cart, amount } = req.body;
      await Payments.processPayment({ paymentMethod, cart, amount, userId });
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.BadRequest());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }
}
