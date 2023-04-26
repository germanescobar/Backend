import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { VALID_DOCTOR_DOMAIN } from '../utils/constants.utils';

const restrictInvalidDoctorUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const { email, birthdate } = req.body;
  if (email) {
    if (!email.match(VALID_DOCTOR_DOMAIN)) return next(ApiError.BadRequest('Invalid email domain'));
  }
  const newDate = new Date(birthdate);
  req.body = {
    ...req.body,
    birthdate: newDate,
  };
  return next();
};

export default restrictInvalidDoctorUpdate;
