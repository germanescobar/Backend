import { Request, Response, NextFunction } from 'express';
import { Locations } from '../service/Locations.service';
export class LocationsController {
  contructor() {}

  static async getLocations(req: Request, res: Response, next: NextFunction) {
    try {
      const locations = await Locations.getLocations();
      res.status(200).json(locations);
    } catch (error) {
      console.log(error);
    }
  }
}
