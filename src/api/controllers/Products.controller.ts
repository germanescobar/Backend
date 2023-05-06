import { Request, Response, NextFunction } from 'express';
import { Products } from '../service/Products.service';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { capitalize } from '../utils/capitalize.utils';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

export class ProductsController {
  constructor() {}

  static async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await Products.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.BadRequest());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }

  static async getProductsByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.params;
      const categoryCapitalized = capitalize(category);
      const products = await Products.getProductsByCategory(categoryCapitalized);
      res.status(200).json(products);
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.BadRequest());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }

  static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await Products.createProduct(req.body);
      res.status(201).json('CREATED');
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.BadRequest('The category already exist'));
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, ...rest } = req.body;
      await Products.updateProduct(id, rest);
      res.status(200).json('UPDATED');
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.BadRequest());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.body;
      await Products.deleteProduct(id);
      res.status(200).json('DELETED');
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.BadRequest());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }
}
