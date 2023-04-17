import { PrismaClient } from '@prisma/client';
import { IDoctor } from '../interfaces/Doctor.interface';
import { INewDoctor } from '../interfaces/NewDoctor.interface';

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
          area: true,
          location: true,
          appointments: true,
        },
      })) as IDoctor;
    } catch (error) {
      throw error;
    }
  }

  static async createDoctor(doctor: INewDoctor): Promise<void> {
    try {
      const {
        location: { city },
        area,
      } = doctor;
      const { id: locationId } = await this.getLocation(city);
      const { id: areaId } = await this.getArea(area);
      await prisma.doctor.create({
        data: {
          ...doctor,
          location: { connect: { id: locationId } },
          area: { connect: { id: areaId } },
          role_id: { connect: { id: doctor.role_id } },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  private static async getLocation(city: string) {
    try {
      return await prisma.location.findFirstOrThrow({
        where: { city },
        select: { id: true },
      });
    } catch (error) {
      throw error;
    }
  }

  private static async getArea(area: string) {
    try {
      return await prisma.area.findFirstOrThrow({
        where: { area },
        select: { id: true },
      });
    } catch (error) {
      throw error;
    }
  }
}
