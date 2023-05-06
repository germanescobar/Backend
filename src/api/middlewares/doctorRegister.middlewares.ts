import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import doctorRegisterSchema from '../schemas/doctorRegister.schema';

const doctorRegisterValidator = (req: Request, res: Response, next: NextFunction): void => {
  const { birthdate, password } = req.body;
  const parsed = JSON.parse(birthdate);
  const newDate = new Date(parsed);
  req.body = {
    ...req.body,
    birthdate: newDate,
    password,
  };
  const { error } = doctorRegisterSchema.validate(req.body);
  if (error) return next(ApiError.BadRequest());
  next();
};

export default doctorRegisterValidator;
