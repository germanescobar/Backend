import { PrismaClient } from '@prisma/client';
import logger from '../../../../config/logger/winston.logger';
import areas from './areas.json';

const prisma = new PrismaClient();

const areasSeeder = async () => {
  try {
    for (const area of areas) {
      try {
        await prisma.area.create({
          data: {
            ...area,
          },
        });
        logger.info('The area seeder was completed succesfully.');
        await prisma.$disconnect();
      } catch (error) {
        logger.info(error);
        logger.error(error);
      }
    }
  } catch (error) {
    logger.info(error);
    logger.error(error);
    process.exit(1);
  }
};

areasSeeder();
