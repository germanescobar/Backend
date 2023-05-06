import { Request, Response, NextFunction } from 'express';
import { Appointments } from '../service/Appointments.service';

export class AppointmentsController {
  constructor() {}

  static async appointments(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, role } = req.user;
      const appointments = await Appointments.getAppointments(id, role);
      res.status(200).json(appointments);
    } catch (error) {}
  }
}
