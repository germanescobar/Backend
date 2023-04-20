import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { Doctors } from '../service/Doctors.service';
import { IAllDoctors } from '../interfaces/AllDoctors.interface';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

export class DoctorsController {
  constructor() {}

  static async getAllDoctors(req: Request, res: Response, next: NextFunction) {
    try {
      const doctors: IAllDoctors[] = await Doctors.getAllDoctor();
      res.status(200).json(doctors);
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.Forbbiden());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }

  static async updateDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, role, ...data } = req.body;
      if (!id || !role) next(ApiError.BadRequest());
      await Doctors.updateDoctor(id, data);
      res.status(200).json('UPDATED');
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.Forbbiden());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }

  static async deleteDoctors(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, email } = req.body;
      if (!id) next(ApiError.BadRequest());
      await Doctors.deleteDoctor(email);
      res.status(204);
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.Forbbiden());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }
}
