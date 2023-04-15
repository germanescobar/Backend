import { PrismaClient } from '@prisma/client';
import { IDoctor } from '../interfaces/Doctor.interface';

const prisma = new PrismaClient();

export class Doctors {
  constructor() {}

  static async getDoctor(searchValue: string): Promise<IDoctor> {
    try {
      return (await prisma.doctor.findFirstOrThrow({
        where: {
          OR: [{ id: searchValue }, { email: searchValue }],
        },
        include: {
          role_id: true,
          Area: true,
          location: true,
          appointments: true,
        },
      })) as IDoctor;
    } catch (error) {
      throw error;
    }
  }
}
