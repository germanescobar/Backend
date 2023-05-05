import { PrismaClient } from '@prisma/client';
import logger from '../../../../config/logger/winston.logger';

const prisma = new PrismaClient();

const categories = ['Painkillers', 'Antibiotics', 'Skincare', 'Vitamins', 'Contraceptives'];

const categoriesSeeder = async () => {
  try {
    for (const category of categories) {
      await prisma.category.create({
        data: { name: category },
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

categoriesSeeder();
