import { Response, Request, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { AuthService } from '../service/Auth.service';

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
    } catch (error) {}
  }
}
