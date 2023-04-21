import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import productDeleteSchema from '../schemas/productDelete.schema';

const productDeleteValidator = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  const { error } = productDeleteSchema.validate(id);
  if (error) next(ApiError.BadRequest('You must provide a product id'));
  next();
};

export default productDeleteValidator;
