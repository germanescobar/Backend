import { Response, Request, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { AuthService } from '../service/Auth.service';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

export class Auth {
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, emailDomain } = req.body;
      const user = await AuthService.login({ email, password }, emailDomain);
      if (!user) return next(ApiError.Unauthorized());
      res.status(200).json(user);
    } catch (error: any) {
      next(ApiError.Internal(error.message));
    }
  }
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await AuthService.register(req.body);
      res.status(201).json('CREATED');
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 500) {
          next(ApiError.Internal('Error unknown in Prisma'));
        }
        next(ApiError.BadRequest());
      }
    }
  }
}
