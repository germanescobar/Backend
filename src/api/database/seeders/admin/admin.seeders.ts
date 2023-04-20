import { PrismaClient } from '@prisma/client';
import { roles } from '../../../utils/roles.utils';
import { IGetRole } from '../../../interfaces/GetRole.interface';
import encryptPassword from '../../../utils/encryptPWD.utils';
import env from '../../../../config/dotenv/dotenv.config';
import logger from '../../../../config/logger/winston.logger';

const prisma = new PrismaClient();

const adminSeeder = async () => {
  try {
    const { id } = await getRole(roles.ADMIN);
    const ADMIN_PWD = await encryptPassword(env.ADMIN_KEY);
    await prisma.admin.create({
      data: {
        name: 'nena dime algo',
        email: 'admin@mebid.com',
        password: ADMIN_PWD,
        role_id: { connect: { id: id } },
      },
    });
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

adminSeeder();
