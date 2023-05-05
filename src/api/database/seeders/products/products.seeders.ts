import { PrismaClient } from '@prisma/client';
import { IGetCategory } from '../../../interfaces/GetCategory.interface';
import products from './products.json';
import logger from '../../../../config/logger/winston.logger';

const prisma = new PrismaClient();

const productsSeeder = async () => {
  try {
    for (const product of products) {
      const { id } = await getCategory(product.category as string);
      await prisma.product.create({
        data: {
          ...product,
          category: { connect: { id } },
        },
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

async function getCategory(category: string): Promise<IGetCategory> {
  try {
    const { id } = await prisma.category.findFirstOrThrow({
      where: {
        name: category,
      },
      select: {
        id: true,
      },
    });
    return { id };
  } catch (error) {
    throw error;
  }
}

productsSeeder();
