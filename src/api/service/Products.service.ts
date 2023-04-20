import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';
import logger from '../../config/logger/winston.logger';
import { PrismaClient, Prisma } from '@prisma/client';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCodes.utils';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { INewProduct } from '../interfaces/NewProduct.interface';
import { Category } from '@prisma/client';
import { IGetCategory } from '../interfaces/GetCategory.interface';

const prisma = new PrismaClient();

export class Products {
  constructor() {}

  static async createProduct(newProduct: INewProduct) {
    try {
      const { category, newCategory, ...rest } = newProduct;
      if (!newCategory) {
        const { id } = await this.getCategory(category);
        await prisma.product.create({
          data: { ...rest, category: { connect: { id } } },
        });
        return;
      }
      const { id } = await this.createCategory(newCategory);
      await prisma.product.create({
        data: { ...rest, category: { connect: { id } } },
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

  private static async createCategory(category: string): Promise<Category> {
    try {
      return await prisma.category.create({
        data: { category },
      });
    } catch (error) {
      throw error;
    }
  }

  private static async getCategory(category: string): Promise<IGetCategory> {
    try {
      return await prisma.category.findFirstOrThrow({
        where: {
          category,
        },
        select: {
          id: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
