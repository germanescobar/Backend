import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import doctorRegisterSchema from '../schemas/doctorRegister.schema';

const doctorRegisterValidator = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = doctorRegisterSchema.validate(req.body);
  if (error) return next(ApiError.BadRequest());
  const { birthdate, password } = req.body;
  req.body = {
    ...req.body,
    birthdate: new Date(birthdate),
    password: JSON.stringify(password),
  };
  next();
};

export default doctorRegisterValidator;
