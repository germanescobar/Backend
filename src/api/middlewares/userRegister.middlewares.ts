import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import userRegisterSchema from '../schemas/userRegister.schema';
import dateformatter from '../utils/dateFormatter.utils';

const userRegisterValidator = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = userRegisterSchema.validate(req.body);
  if (error) return next(ApiError.BadRequest());
  const { birthdate } = req.body;
  req.body = {
    ...req.body,
    birthdate: new Date(birthdate),
  };
  next();
};

export default userRegisterValidator;
