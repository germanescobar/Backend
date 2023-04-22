import { PrismaClient, Prisma } from '@prisma/client';
import { IDoctor } from '../interfaces/Doctor.interface';
import { INewDoctor } from '../interfaces/NewDoctor.interface';
import { IUpdateDataDoctor } from '../interfaces/UpdateDataDoctor.interface';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCodes.utils';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { IAllDoctors } from '../interfaces/AllDoctors.interface';
import { allDoctorsfields } from './selectFields/doctors/allDoctors.selectFields';
import logger from '../../config/logger/winston.logger';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';

const prisma = new PrismaClient();

export class Doctors {
  constructor() {}

  static async getAllDoctor(): Promise<IAllDoctors[]> {
    try {
      const response = await prisma.doctor.findMany({
        select: allDoctorsfields,
      });
      return response;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(error);
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }

  static async getDoctor(searchValue: string): Promise<IDoctor> {
    try {
      return (await prisma.doctor.findFirstOrThrow({
        where: {
          OR: [{ id: searchValue }, { email: searchValue }],
        },
        include: {
          role_id: true,
          area: true,
          headquarter: true,
          appointments: true,
        },
      })) as IDoctor;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(error);
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
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
          headquarter: { connect: { id: locationId } },
          area: { connect: { id: areaId } },
          role_id: { connect: { id: doctor.role_id } },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateDoctor(id: string, data: IUpdateDataDoctor): Promise<void> {
    try {
      await prisma.doctor.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(error);
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }

  static async deleteDoctor(email: string): Promise<void> {
    try {
      await prisma.doctor.delete({
        where: { email },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('hello');
        console.log(error);
        logger.error(error);
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }

  private static async getLocation(city: string) {
    try {
      return await prisma.headquarter.findFirstOrThrow({
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
