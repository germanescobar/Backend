import { PrismaClient } from '@prisma/client';
import logger from '../../../../config/logger/winston.logger';
import locations from './locations.json';

const prisma = new PrismaClient();

const locationSeeder = async (): Promise<void> => {
  try {
    for (const country of locations) {
      for (const city of country.locations) {
        const { city: locationCity, address: locationAddress }: any = city;
        const locationData = { country: country.country, city: locationCity, address: locationAddress };
        try {
          await prisma.location.create({
            data: { ...locationData },
          });
          logger.info('The location seeder was completed succesfully.');
          await prisma.$disconnect();
        } catch (error) {
          logger.info(error);
          logger.error(error);
        }
      }
    }
  } catch (error) {
    logger.info(error);
    logger.error(error);
    process.exit(1);
  }
};

locationSeeder();
