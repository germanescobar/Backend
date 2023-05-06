import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { VALID_DOCTOR_DOMAIN } from '../utils/constants.utils';

const isValidEmail = (req: Request, res: Response, next: NextFunction): void => {
  const { email } = req.body;
  if (email) {
    if (!email.match(VALID_DOCTOR_DOMAIN)) return next(ApiError.BadRequest('Invalid email domain'));
  }
  return next();
};

export default isValidEmail;
