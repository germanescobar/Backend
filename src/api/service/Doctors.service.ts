import { PrismaClient, Prisma } from '@prisma/client';
import { IDoctor } from '../interfaces/Doctor.interface';
import { INewDoctor } from '../interfaces/NewDoctor.interface';
import { IUpdateDataDoctor } from '../interfaces/UpdateDataDoctor.interface';
import { IAllDoctors } from '../interfaces/AllDoctors.interface';
import { IAllAreas } from '../interfaces/AllAreas.interface';
import { IUpdateDataDoctorByUser } from '../interfaces/UpdateDataDoctorByUser.interface';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCodes.utils';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { allDoctorsfields } from './selectFields/doctors/allDoctors.selectFields';
import encryptPassword from '../utils/encryptPWD.utils';
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
          appointments: true,
          headquarter: {
            select: { city: true, address: true, location: { select: { country: true } } },
          },
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
        headquarter: { city },
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

  static async updateDoctor(data: IUpdateDataDoctor): Promise<void> {
    try {
      const {
        headquarter: { city },
        area: { area },
        id,
      } = data;
      const { id: locationId } = await this.getLocation(city);
      const { id: areaId } = await this.getArea(area);
      await prisma.doctor.update({
        where: {
          id,
        },
        data: {
          ...data,
          headquarter: { connect: { id: locationId } },
          area: { connect: { id: areaId } },
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

  static async updateDoctorByUser(id: string, data: IUpdateDataDoctorByUser): Promise<void> {
    try {
      const { password } = data;
      if (password) {
        const encryptedNewPassword = await encryptPassword(password);
        await prisma.doctor.update({
          where: { id },
          data: {
            password: encryptedNewPassword,
          },
        });
        return;
      }
      await prisma.doctor.update({
        where: { id },
        data,
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

  static async deleteDoctor(id: string): Promise<void> {
    try {
      await prisma.doctor.delete({
        where: { id },
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

  static async getAreas(): Promise<IAllAreas[]> {
    try {
      return await prisma.area.findMany({
        select: { id: true, area: true, price: true, doctors: true },
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

  private static async getArea(area: string) {
    try {
      return await prisma.area.findFirstOrThrow({
        where: { area },
        select: { id: true, area: true },
      });
    } catch (error) {
      throw error;
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
}
