import { Response, Request, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { AuthService } from '../service/Auth.service';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

export class Auth {
  static async authentication(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, emailDomain } = req.body;
      const token = await AuthService.authentication({ email, password }, emailDomain);
      if (token instanceof ApiError) return next(ApiError.Unauthorized());
      res.status(200).json(token);
    } catch (error: any) {
      return next(ApiError.Internal(error.message));
    }
  }

  static async authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const user = await AuthService.authorization(id);
      res.status(200).json(user);
    } catch (error: any) {
      if (error instanceof PrismaError) {
        if (error.status === 404) {
          return next(ApiError.NotFound());
        }
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }

  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await AuthService.userRegister(req.body);
      res.status(201).json('CREATED');
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 500) {
          return next(ApiError.Internal('Error unknown in Prisma'));
        }
        return next(ApiError.BadRequest());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }
}
