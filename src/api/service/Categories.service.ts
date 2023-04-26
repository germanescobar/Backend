import { PrismaClient, Prisma } from '@prisma/client';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCodes.utils';
import { IAllCategories } from '../interfaces/AllCategories.interface';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';
import logger from '../../config/logger/winston.logger';

const prisma = new PrismaClient();

export class Categories {
  constructor() {}

  static async getCategories(): Promise<IAllCategories[]> {
    try {
      return await prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }
}
