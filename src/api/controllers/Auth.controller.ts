import { Response, Request, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { AuthService } from '../service/Auth.service';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';
import { ITokenPayload } from '../interfaces/TokenPayload.interface';

export class Auth {
  static async authentication(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, emailDomain } = req.body;
      const token = await AuthService.authentication({ email, password }, emailDomain);
      if (token instanceof ApiError) return next(ApiError.Unauthorized());
      res.status(200).json(token);
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.Unauthorized());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }

  static async authorization(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tokenPayload: ITokenPayload = req.user;

      const authenticatedAccount = await AuthService.authorization(tokenPayload);
      res.status(200).json(authenticatedAccount);
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.Forbbiden());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }

  static async userRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
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
  static async doctorRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await AuthService.doctorRegister(req.body);
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
