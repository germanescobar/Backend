import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';
import logger from '../../config/logger/winston.logger';
import { PrismaClient, Prisma } from '@prisma/client';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCodes.utils';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { INewProduct } from '../interfaces/NewProduct.interface';
import { Category } from '@prisma/client';
import { IGetCategory } from '../interfaces/GetCategory.interface';
import { IAllProducts } from '../interfaces/AllProducts.interface';
import { IUpdateDataProduct } from '../interfaces/UpdateDataProduct.interface';
import { allProductsFields } from './selectFields/products/allProducts.selectFields';

const prisma = new PrismaClient();

export class Products {
  constructor() {}

  static async getAllProducts(): Promise<IAllProducts[]> {
    try {
      const products = await prisma.product.findMany({
        select: allProductsFields,
      });
      return products;
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

  static async getProductsByCategory(category: string): Promise<IAllProducts[]> {
    try {
      return await prisma.product.findMany({
        where: {
          category: { name: category },
        },
        select: allProductsFields,
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

  static async createProduct(newProduct: INewProduct): Promise<void> {
    try {
      const { category, newCategory, ...remainingProps } = newProduct;
      if (!newCategory) {
        const { id } = await this.getCategory(category);
        await prisma.product.create({
          data: { ...remainingProps, category: { connect: { id } } },
        });
        return;
      }
      const { id } = await this.createCategory(newCategory);
      await prisma.product.create({
        data: { ...remainingProps, category: { connect: { id } } },
      });
      return;
    } catch (error) {
      console.log(error);
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

  static async deleteProduct(id: string): Promise<void> {
    try {
      await prisma.product.delete({
        where: {
          id,
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

  static async updateProduct(id: string, data: IUpdateDataProduct): Promise<void> {
    try {
      await prisma.product.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }

  private static async createCategory(category: string): Promise<Category> {
    try {
      return await prisma.category.create({
        data: { name: category },
      });
    } catch (error) {
      throw error;
    }
  }

  private static async getCategory(category: string): Promise<IGetCategory> {
    try {
      return await prisma.category.findFirstOrThrow({
        where: {
          name: category,
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
