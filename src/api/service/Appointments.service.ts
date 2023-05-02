import { Prisma, PrismaClient } from '@prisma/client';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCodes.utils';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { appointment } from '../interfaces/Cart.interface';
import { Patient } from './Patients.service';
import { Locations } from './Locations.service';
import logger from '../../config/logger/winston.logger';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

const prisma = new PrismaClient();

export class Appointments {
  constructor() {}

  static async createAppointment(appointments: appointment[], userId: string) {
    try {
      for (const appointment of appointments) {
        const { patientEmail } = appointment.patientData;
        const isPatient = await Patient.getPatient(patientEmail);
        if (!isPatient) {
          const { patientData, appointmentData } = appointment;
          const { preferredDoctorSelected, specialitySelected, appointmentDate, appointmentTime, citySelected } =
            appointmentData;
          const [day, month, year] = appointmentDate.split('/');
          await Locations.getLocation(citySelected);
          const { id: patientId } = await Patient.createPatient(patientData);
          // await prisma.appointment.create({
          //   data: {
          //     user: { connect: { id: userId } },
          //     patient: { connect: { id: patientId } },
          //     doctor: { connect: { id: preferredDoctorSelected } },
          //     area: { connect: { id: specialitySelected } },
          //     date: new Date(`${year}-${month}-${day}`),
          //     scheduleAt: appointmentTime,
          //     headquarter: { connect: { id } },
          //   },
          // });
        }
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }
}
