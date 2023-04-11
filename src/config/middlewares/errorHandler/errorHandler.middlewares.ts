import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError.middlewares';

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): Response {
  if (error instanceof ApiError) return res.status(error.status).json(error.message);
  return res.status(500).json('Something went wrong');
}
