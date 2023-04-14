import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { ILogin } from '../interfaces/Login.interface';
import authenticationSchema from '../schemas/authentication.schema';
import domainChecker from '../utils/domainChecker.utils';

const authenticationValidator = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password }: ILogin = req.body;
  if (!email || !password) next(ApiError.BadRequest());
  const { error } = authenticationSchema.validate({ email, password });
  if (error) return next(ApiError.BadRequest());
  const emailDomain = domainChecker(email);
  req.body = {
    ...req.body,
    emailDomain,
  };
  next();
};

export default authenticationValidator;
