import { Prisma, PrismaClient } from '@prisma/client';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCodes.utils';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { appointment } from '../interfaces/Cart.interface';
import { Patient } from './Patients.service';
import { Doctors } from './Doctors.service';
import { Users } from './Users.service';
import { Locations } from './Locations.service';
import { IIdentification } from '../interfaces/Identification.interface';
import { roles } from '../utils/roles.utils';
import logger from '../../config/logger/winston.logger';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

const prisma = new PrismaClient();

export class Appointments {
  constructor() {}

  static async getAppointments(id: string, role: number) {
    try {
      if (role === roles.USER) {
        return await Users.getUserAppointments(id);
      }
      if (role === roles.DOCTOR) {
        return await Doctors.getDoctorsAppointments(id);
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

  static async createAppointment(appointments: appointment[], userId: string): Promise<IIdentification[]> {
    try {
      const appointmentsIds = [];
      for (const appointment of appointments) {
        const { patientEmail } = appointment.patientData;
        const { patientData, appointmentData } = appointment;
        const {
          preferredDoctorSelected,
          specialitySelected,
          appointmentDate,
          appointmentTime,
          citySelected,
          consultationReasons,
        } = appointmentData;
        const [day, month, year] = appointmentDate.split('/');
        const isPatient = await Patient.getPatient(patientEmail);
        const locatiodId = await Locations.getLocation(citySelected);
        if (!isPatient) {
          const { id: patientId } = await Patient.createPatient(patientData);
          const { id } = await prisma.appointment.create({
            data: {
              user: { connect: { id: userId } },
              patient: { connect: { id: patientId } },
              doctor: { connect: { id: preferredDoctorSelected.id } },
              area: { connect: { id: specialitySelected.id } },
              date: new Date(`${year}-${month}-${day}`),
              scheduleAt: appointmentTime,
              headquarter: { connect: { id: locatiodId?.id } },
              reason: consultationReasons,
            },
          });
          appointmentsIds.push({ id });
        } else {
          const { id } = await prisma.appointment.create({
            data: {
              user: { connect: { id: userId } },
              patient: { connect: { id: isPatient.id } },
              doctor: { connect: { id: preferredDoctorSelected.id } },
              area: { connect: { id: specialitySelected.id } },
              date: new Date(`${year}-${month}-${day}`),
              scheduleAt: appointmentTime,
              headquarter: { connect: { id: locatiodId?.id } },
              reason: consultationReasons,
            },
          });
          appointmentsIds.push({ id });
        }
      }
      return appointmentsIds;
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
