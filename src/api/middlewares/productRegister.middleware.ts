import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import productRegisterSchema from '../schemas/productRegister.schema';

const productRegisterValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = productRegisterSchema.validate(req.body);
  if (error) return next(ApiError.BadRequest());
  const { price, stock, discount } = req.body;
  req.body = {
    ...req.body,
    price: +price,
    stock: +stock,
    discount: +discount,
  };
  next();
};

export default productRegisterValidator;
