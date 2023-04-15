import { PrismaClient, Prisma } from '@prisma/client';
import { Users } from './Users.service';
import { ILogin } from '../interfaces/Login.interface';
import { IUser } from '../interfaces/User.interface';
import { IGetRole } from '../interfaces/GetRole.interface';
import { IUserResponse } from '../interfaces/UserResponse.interface';
import { INewUser } from '../interfaces/NewUser.interface';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { IAuthentication } from '../interfaces/Authentication.interface';
import { UserDTO } from '../DTO/login.dto';
import env from '../../config/dotenv/dotenv.config';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import encryptPassword from '../utils/encryptPWD.utils';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCodes.utils';
import roles from '../utils/roles.utils';
import logger from '../../config/logger/winston.logger';

const prisma = new PrismaClient();

export class AuthService {
  private static expToken = Math.floor(Date.now() / 1000) + 60 * 60;
  constructor() {}
  //TO-DO: finish the doctors and admin login in order to correctly take the output of the login method.
  static async authentication({ email, password }: ILogin, emailDomain: number) {
    try {
      if (emailDomain === roles.USER) return await this.userAuthentication({ email, password });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(error);
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }

  private static async userAuthentication({ email, password }: ILogin): Promise<IAuthentication | ApiError> {
    try {
      const response = await Users.getUser(email);
      if (!response) return ApiError.Unauthorized();
      const isAuth = await bcrypt.compare(password, response.password);
      if (!isAuth) return ApiError.Unauthorized();
      const token = this.signToken(response.id);
      return token;
    } catch (error) {
      throw error;
    }
  }

  private static signToken(id: string): IAuthentication {
    const ACCESS_TOKEN: string = JWT.sign({ id }, env.SECRET_JWT, {
      expiresIn: this.expToken,
    });
    return { ACCESS_TOKEN };
  }

  static async authorization(id: string): Promise<IUserResponse> {
    try {
      const user = await Users.getUser(id);
      const userFormatted: IUserResponse = new UserDTO(user);
      return userFormatted;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(error);
        logger.info('Prisma error:', error);
        if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
        if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 404);
        throw new PrismaError(error.message, 500);
      }
      throw ApiError.Internal('Error unknown in Prisma');
    }
  }

  static async userRegister(newUser: INewUser): Promise<void> {
    try {
      const { id } = await this.getRole(roles.USER);
      const encryptedPassword = await encryptPassword(newUser.password);
      const user: INewUser = { ...newUser, roleId: id, password: encryptedPassword };
      await prisma.user.create({ data: { ...user } });
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

  private static async getRole(role: number): Promise<IGetRole> {
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
      throw error;
    }
  }
}
