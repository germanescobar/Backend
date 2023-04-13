import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';

const prisma = new PrismaClient();

export class UsersController {
  constructor() {}

  static async allUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await prisma.user.findMany();
      res.status(200).json(user);
    } catch (error: any) {
      next(ApiError.Internal(error.message));
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, lastname, username, avatar, email, phone, nationality, gender, birthday, blood_type, password } =
        req.body;

      if (
        !name ||
        !lastname ||
        !username ||
        !avatar ||
        !email ||
        !phone ||
        !nationality ||
        !gender ||
        !birthday ||
        !blood_type ||
        !password
      ) {
        next(ApiError.Forbbiden());
      }

      await prisma.user.create({
        data: { ...req.body, birthday: new Date(birthday), role: 1993 },
      });
      res.status(201).json('CREATED');
    } catch (error: any) {
      next(ApiError.Internal(error.message));
    }
  }

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
      const { id, data } = req.body;
      if (!id || !data) next(ApiError.Forbbiden());
      await prisma.user.update({
        where: {
          id: id,
        },
        data: { ...data },
      });
      res.status(200).json('UPDATED');
    } catch (error: any) {
      next(ApiError.Internal(error.message));
    }
  }
}
