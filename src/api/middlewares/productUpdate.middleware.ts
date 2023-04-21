import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import productUpdateSchema from '../schemas/productUpdate.schema';

const productUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = productUpdateSchema.validate(req.body);
  if (error) return next(ApiError.BadRequest());
  const { newCategory, ...remainingProps } = req.body;
  if (newCategory) return next(ApiError.BadRequest('Invalid field to update'));
  req.body = {
    ...remainingProps,
  };
  next();
};

export default productUpdateValidator;
