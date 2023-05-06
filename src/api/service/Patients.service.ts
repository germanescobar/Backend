import { PrismaClient } from '@prisma/client';
import { patientData } from '../interfaces/Cart.interface';
import { IIdentification } from '../interfaces/Identification.interface';
import { Patient as IPatient } from '@prisma/client';

const prisma = new PrismaClient();

export class Patient {
  constructor() {}

  static async getPatient(email: string): Promise<IPatient | null> {
    try {
      return await prisma.patient.findFirst({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  }

  static async createPatient(patient: patientData): Promise<IIdentification> {
    try {
      const { patientName, patientLastname, patientPhone, patientEmail, patientGender, isAdult, patientId } = patient;
      const { id, email } = await prisma.patient.create({
        data: {
          firstname: patientName,
          lastname: patientLastname,
          email: patientEmail,
          identification: patientId,
          isAdult: !!isAdult,
          gender: patientGender,
          phone: patientPhone,
        },
      });
      return { id };
    } catch (error) {
      throw error;
    }
  }
}
