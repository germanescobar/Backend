import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError.middlewares';
import logger from '../../logger/winston.logger';

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): Response {
  if (error instanceof ApiError) {
    logger.error(`${error.status}: ${error.message}`);
    return res.status(error.status).json(error.message);
  }
  logger.error('500: Something went wrong');
  return res.status(500).json('Something went wrong');
}
