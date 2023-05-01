import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import payments from '../schemas/payments.schema';

const paymentsValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = payments.validate(req.body);
  if (error) return next(ApiError.BadRequest('Error validating your bought'));
  const { amount } = req.body;
  req.body = {
    ...req.body,
    amount: Number(amount.toFixed(2)) * 100,
  };
  next();
};
export default paymentsValidator;
