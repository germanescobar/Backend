import { PrismaClient, Prisma } from '@prisma/client';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCodes.utils';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import logger from '../../config/logger/winston.logger';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

const prisma = new PrismaClient();

export class Locations {
  constructor() {}

  static async getLocations() {
    try {
      const locations = await prisma.location.findMany({
        include: { headquarters: { select: { city: true, address: true } } },
      });
      return locations;
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

  static async getLocation(searchValue: string) {
    try {
      return await prisma.headquarter.findFirst({
        where: {
          OR: [{ id: searchValue }, { city: searchValue }],
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
