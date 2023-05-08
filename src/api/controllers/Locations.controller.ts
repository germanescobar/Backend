import { Request, Response, NextFunction } from 'express';
import { Locations } from '../service/Locations.service';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

class LocationsController {
  contructor() {}

  static async getLocations(req: Request, res: Response, next: NextFunction) {
    try {
      const locations = await Locations.getLocations();
      res.status(200).json(locations);
    } catch (error) {
      if (error instanceof PrismaError) {
        if (error.status === 404) return next(ApiError.NotFound());
        if (error.status === 400) return next(ApiError.BadRequest());
      }
      return next(ApiError.Internal('Unknown Error'));
    }
  }
}

export default LocationsController;
