import { PrismaClient } from '@prisma/client';
import logger from '../../../../config/logger/winston.logger';

const prisma = new PrismaClient();
const roles = [1993, 2023, 1000];

const rolesSeeder = async () => {
  try {
    for (const role of roles) {
      try {
        await prisma.role.create({
          data: {
            role,
          },
        });
        logger.info('The role seeder was completed succesfully.');
        await prisma.$disconnect();
      } catch (error) {
        logger.error(error);
      }
    }
  } catch (error) {
    logger.error(error);
  }
};

rolesSeeder();
