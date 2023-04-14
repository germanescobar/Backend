import { PrismaClient, Prisma } from '@prisma/client';
import { ILogin } from '../interfaces/Login.interface';
import { IUser } from '../interfaces/User.interface';
import { IUserResponse } from '../interfaces/UserResponse.interface';
import { INewUser } from '../interfaces/NewUser.interface';
import encryptPassword from '../utils/encryptPWD.utils';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';
import prismaErrorsCodes from '../utils/prismaErrorsCodes.utils';
import roles from '../utils/roles.utils';
import logger from '../../config/logger/winston.logger';

const prisma = new PrismaClient();

export class AuthService {
  constructor() {}
  //TO-DO: finish the doctors and admin login in order to correctly take the output of the login method.
  static async login({ email, password }: ILogin, emailDomain: number) {
    try {
      if (emailDomain === roles.USER) return await this.userLogin({ email, password });
    } catch (error: any) {
      throw error;
    }
  }

  private static async userLogin({ email, password }: ILogin): Promise<IUserResponse | null> {
    try {
      const response = (await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          role_id: true,
        },
      })) as IUser;

      if (!response) return response;
      const {
        role_id: { role },
        roleId,
        ...userData
      } = response;
      const user: IUserResponse = { ...userData, role };
      return user;
    } catch (error: any) {
      throw error;
    }
  }

  private static async getRole(role: number): Promise<{ id: string }> {
    try {
      return (await prisma.role.findFirst({
        where: {
          role: role,
        },
        select: {
          id: true,
        },
      })) as { id: string };
    } catch (e) {
      throw e;
    }
  }

  static async register(newUser: INewUser): Promise<void> {
    try {
      const { id } = await this.getRole(roles.USER);
      const encryptedPassword = await encryptPassword(newUser.password);
      const user: INewUser = { ...newUser, roleId: id, password: encryptedPassword };
      await prisma.user.create({ data: { ...user } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(error);
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes.includes(error.code)) throw new PrismaError(error.message, 400);
        throw new PrismaError(error.message, 500);
      }
    }
  }
}
