import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';
import logger from '../../config/logger/winston.logger';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { PrismaClient, Prisma } from '@prisma/client';
import { IUser } from '../interfaces/User.interface';
import { User } from '@prisma/client';
import { INewUser } from '../interfaces/NewUser.interface';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCodes.utils';
import { IUpdateDataUser } from '../interfaces/UpdateDataUser.interface';
import encryptPassword from '../utils/encryptPWD.utils';

const prisma = new PrismaClient();

export class Users {
  constructor() {}

  static async getUser(searchValue: string): Promise<IUser> {
    try {
      return (await prisma.user.findFirstOrThrow({
        where: {
          OR: [{ id: searchValue }, { email: searchValue }],
        },
        include: {
          role_id: true,
        },
      })) as IUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(error);
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      const user = await prisma.user.findMany();
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(error);
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }

  static async getUserAppointments(id: string) {
    try {
      return await prisma.user.findUniqueOrThrow({
        where: { id },
        select: {
          appointments: {
            select: {
              area: { select: { area: true } },
              date: true,
              doctor: { select: { firstname: true, lastname: true, email: true, phone: true } },
              headquarter: { select: { address: true, city: true } },
              patient: { select: { firstname: true, lastname: true } },
              scheduleAt: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(error);
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }

  static async createUser(newUser: INewUser): Promise<void> {
    try {
      await prisma.user.create({ data: { ...newUser, role_id: { connect: { id: newUser.role_id } } } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(error);
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }

  static async updateUser(id: string, data: IUpdateDataUser): Promise<void> {
    try {
      const { password } = data;
      if (password) {
        const encryptedNewPassword = await encryptPassword(password);
        await prisma.user.update({
          where: { id },
          data: { password: encryptedNewPassword },
        });
        return;
      }
      await prisma.user.update({
        where: {
          id,
        },
        data: { ...data },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(error);
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }
}
