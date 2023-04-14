import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import JWT, { JsonWebTokenError } from 'jsonwebtoken';
import authorizationSchema from '../schemas/authorizationSchema.schema';
import env from '../../config/dotenv/dotenv.config';

const authorizationValidator = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) return next(ApiError.Forbbiden());
  const ACCESS_TOKEN = req.headers.authorization.split(' ')[1] as string;
  const { error } = authorizationSchema.validate(ACCESS_TOKEN);
  if (error) return next(ApiError.Forbbiden());
  try {
    const { id } = JWT.verify(ACCESS_TOKEN, env.SECRET_JWT) as { id: string };
    req.body = {
      ...req.body,
      id: id,
    };
    return next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) return next(ApiError.Forbbiden());
    return next(ApiError.Internal('Something went wrong'));
  }
};

export default authorizationValidator;
