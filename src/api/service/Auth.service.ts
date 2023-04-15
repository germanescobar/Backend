import { PrismaClient, Prisma } from '@prisma/client';
import { Users } from './Users.service';
import { Doctors } from './Doctors.service';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { UserDTO } from '../DTO/User.dto';
import { AuthenticationDTO } from '../DTO/Authentication.dto';
import { ILogin } from '../interfaces/Login.interface';
import { IGetRole } from '../interfaces/GetRole.interface';
import { IAuthorizedUser } from '../interfaces/AuthorizedUser.interface';
import { INewUser } from '../interfaces/NewUser.interface';
import { IAuthentication } from '../interfaces/Authentication.interface';
import { AuthenticationDTO as IAuthenticationDTO } from '../DTO/Authentication.dto';
import JWT from 'jsonwebtoken';
import env from '../../config/dotenv/dotenv.config';
import bcrypt from 'bcrypt';
import encryptPassword from '../utils/encryptPWD.utils';
import PrismaError from '../../config/middlewares/errorHandler/PrismaErrorHandler.middleware';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCodes.utils';
import roles from '../utils/roles.utils';
import logger from '../../config/logger/winston.logger';
import { ITokenPayload } from '../interfaces/TokenPayload.interface';

const prisma = new PrismaClient();

export class AuthService {
  private static expToken = Math.floor(Date.now() / 1000) + 60 * 60;
  constructor() {}
  //TO-DO: finish the doctors and admin login in order to correctly take the output of the login method.
  static async authentication({ email, password }: ILogin, emailDomain: number) {
    try {
      let authenticatedAccount;
      if (emailDomain === roles.USER) authenticatedAccount = await Users.getUser(email);
      if (emailDomain === roles.DOCTOR) authenticatedAccount = await Doctors.getDoctor(email);
      if (!authenticatedAccount) return ApiError.Unauthorized();
      const isAuth = await bcrypt.compare(password, authenticatedAccount.password);
      if (!isAuth) return ApiError.Unauthorized();
      const tokenPayload = { ...new AuthenticationDTO(authenticatedAccount) };
      const token = this.signToken(tokenPayload);
      return token;
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

  private static signToken(payload: IAuthenticationDTO): IAuthentication {
    const ACCESS_TOKEN: string = JWT.sign(payload, env.SECRET_JWT, {
      expiresIn: this.expToken,
    });

    return { ACCESS_TOKEN };
  }

  static async authorization({ id, role }: ITokenPayload): Promise<IAuthorizedUser> {
    try {
      if (role === roles.USER) {
        const user = await Users.getUser(id);
        const userFormatted: IAuthorizedUser = new UserDTO(user);
        return userFormatted;
      }
      if (role === roles.DOCTOR) {
        const doctor = await Doctors.getDoctor(id);
      }
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

  static async doctorRegister() {
    try {
    } catch (error) {
      console.log(error);
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
