import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { ITokenPayload } from '../interfaces/TokenPayload.interface';
import JWT, { JsonWebTokenError } from 'jsonwebtoken';
import authorizationSchema from '../schemas/authorization.schema';
import env from '../../config/dotenv/dotenv.config';

const authorizationValidator = (
  allowedRoles: number[]
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!allowedRoles.length) return next(ApiError.Internal('You must specify the roles that should be authorized'));
    if (!req.headers.authorization) return next(ApiError.Forbbiden());
    const ACCESS_TOKEN = req.headers.authorization.split(' ')[1] as string;
    const { error } = authorizationSchema.validate(ACCESS_TOKEN);
    if (error) return next(ApiError.Forbbiden());
    try {
      const { id, role } = JWT.verify(ACCESS_TOKEN, env.SECRET_JWT) as ITokenPayload;
      if (!allowedRoles.includes(role)) return next(ApiError.Forbbiden());
      req.body = {
        ...req.body,
        id,
        role,
      };
      return next();
    } catch (error) {
      if (error instanceof JsonWebTokenError) return next(ApiError.Forbbiden());
      return next(ApiError.Internal('Something went wrong'));
    }
  };
};

export default authorizationValidator;
