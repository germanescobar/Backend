import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { VALID_DOCTOR_FIELDS } from '../utils/constants.utils';
import { VALID_DOCTOR_DOMAIN } from '../utils/constants.utils';

const restrictInvalidDoctorUpdate = (req: Request, res: Response, next: NextFunction): void => {
  for (const key in req.body) {
    if (!VALID_DOCTOR_FIELDS.includes(key)) return next(ApiError.BadRequest());
  }
  const { email } = req.body;
  if (email) {
    if (!email.match(VALID_DOCTOR_DOMAIN)) return next(ApiError.BadRequest());
  }
  return next();
};

export default restrictInvalidDoctorUpdate;
