import { PrismaClient } from '@prisma/client';
import logger from '../../../../config/logger/winston.logger';
import { roles } from '../../../utils/roles.utils';
import { IGetRole } from '../../../interfaces/GetRole.interface';
import encryptPassword from '../../../utils/encryptPWD.utils';
import doctors from './doctors.json';

const prisma = new PrismaClient();

const doctorsSeeders = async () => {
  try {
    const { id: role_id } = await getRole(roles.DOCTOR);

    for (const doctor of doctors) {
      const {
        headquarter: { city },
        area,
      } = doctor;
      const encryptedPassword = await encryptPassword(doctor.password);
      const { id: locationId } = await getLocation(city);
      const { id: areaId } = await getArea(area);

      await prisma.doctor.create({
        data: {
          ...doctor,
          password: encryptedPassword,
          headquarter: { connect: { id: locationId } },
          area: { connect: { id: areaId } },
          role_id: { connect: { id: role_id } },
        },
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

async function getRole(role: number): Promise<IGetRole> {
  try {
    return await prisma.role.findFirstOrThrow({
      where: {
        role,
      },
      select: {
        id: true,
      },
    });
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

async function getLocation(city: string) {
  try {
    return await prisma.headquarter.findFirstOrThrow({
      where: { city },
      select: { id: true },
    });
  } catch (error) {
    throw error;
  }
}

async function getArea(area: string) {
  try {
    return await prisma.area.findFirstOrThrow({
      where: { area },
      select: { id: true, area: true },
    });
  } catch (error) {
    throw error;
  }
}

doctorsSeeders();
