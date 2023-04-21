import { Request, Response, NextFunction } from 'express';
import { Products } from '../service/Products.service';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

export class ProductsController {
  constructor() {}

  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
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
