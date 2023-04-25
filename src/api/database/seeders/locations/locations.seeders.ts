import { Location, PrismaClient } from '@prisma/client';
import logger from '../../../../config/logger/winston.logger';
import locations from './locations.json';

const prisma = new PrismaClient();

interface IsLocation {
  id: string;
}

const locationSeeder = async (): Promise<void> => {
  try {
    for (const country of locations) {
      for (const city of country.locations) {
        const isLocation: IsLocation | null = await getlocation(country.country);
        const { city: locationCity, address: locationAddress }: any = city;
        try {
          if (!isLocation) {
            const { id } = await createLocation(country.country);
            await prisma.headquarter.create({
              data: { city: locationCity, address: locationAddress, location: { connect: { id } } },
            });
          }

          await prisma.headquarter.create({
            data: { city: locationCity, address: locationAddress, location: { connect: { id: isLocation?.id } } },
          });
        } catch (error) {
          logger.info(error);
          logger.error(error);
        }
        logger.info('The location seeder was completed succesfully.');
        await prisma.$disconnect();
      }
    }
  } catch (error) {
    logger.info(error);
    logger.error(error);
    process.exit(1);
  }
};

async function createLocation(country: string): Promise<Location> {
  try {
    return await prisma.location.create({
      data: { country },
    });
  } catch (error) {
    throw error;
  }
}

async function getlocation(country: string): Promise<{ id: string } | null> {
  try {
    return await prisma.location.findFirst({
      where: { country },
      select: { id: true },
    });
  } catch (error) {
    throw error;
  }
}

locationSeeder();
