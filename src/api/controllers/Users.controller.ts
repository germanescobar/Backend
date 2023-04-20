import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { Users } from '../service/Users.service';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

const prisma = new PrismaClient();

export class UsersController {
  constructor() {}

  static async allUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await Users.getAllUsers();
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.Forbbiden());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }

  // TO-DO: Check if this controller should be necessary
  static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.body;
      if (!id) next(ApiError.Forbbiden());
      await prisma.user.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json('DELETED');
    } catch (error: any) {
      next(ApiError.Internal(error.message));
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, role, ...data } = req.body;
      if (!id || !role) next(ApiError.BadRequest());
      await Users.updateUser(id, data);
      res.status(200).json('UPDATED');
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.Forbbiden());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }
}
