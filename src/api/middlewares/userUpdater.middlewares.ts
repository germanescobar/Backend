import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { VALID_FIELDS } from '../utils/constants.utils';

const restrictInvalidUserUpdate = (req: Request, res: Response, next: NextFunction): void => {
  for (const key in req.body) {
    if (!VALID_FIELDS.includes(key)) return next(ApiError.BadRequest());
  }
  return next();
};

export default restrictInvalidUserUpdate;
