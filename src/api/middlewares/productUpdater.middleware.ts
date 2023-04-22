import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { VALID_PRODUCT_FIELDS } from '../utils/constants.utils';

const restrictInvalidProductUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const { id, ...rest } = req.body;
  for (const key in rest) {
    if (!VALID_PRODUCT_FIELDS.includes(key)) return next(ApiError.BadRequest(`You can't update the field ${key}`));
  }
  next();
};

export default restrictInvalidProductUpdate;
