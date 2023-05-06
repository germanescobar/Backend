import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import payments from '../schemas/payments.schema';
import appointment from '../schemas/appointments.schema';

const paymentsValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = payments.validate(req.body);
  if (error) return next(ApiError.BadRequest('Error validating your purchase'));
  const { cart } = req.body;
  if (!!cart.appointments) {
    const { error } = appointment.validate(cart.appointments);
    if (error) return next(ApiError.BadRequest('Please, check your appointment data to schedule it'));
  }
  const { amount } = req.body;
  req.body = {
    ...req.body,
    amount: Math.round(amount * 100),
  };
  next();
};
export default paymentsValidator;
