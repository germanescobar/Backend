import { PrismaClient, Prisma } from '@prisma/client';
import { Users } from './Users.service';
import { Doctors } from './Doctors.service';
import { ApiError } from '../../config/middlewares/errorHandler/ApiError.middlewares';
import { UserDTO } from '../DTO/User.dto';
import { DoctorDTO } from '../DTO/Doctor.dto';
import { AuthenticationDTO } from '../DTO/Authentication.dto';
import { ILogin } from '../interfaces/Login.interface';
import { IGetRole } from '../interfaces/GetRole.interface';
import { IAuthorizedUser } from '../interfaces/AuthorizedUser.interface';
import { IAuthorizedDoctor } from '../interfaces/AuthorizedDoctor.interface';
import { INewUser } from '../interfaces/NewUser.interface';
import { IAuthentication } from '../interfaces/Authentication.interface';
import { AuthenticationDTO as IAuthenticationDTO } from '../DTO/Authentication.dto';
import { INewDoctor } from '../interfaces/NewDoctor.interface';
import { ITokenPayload } from '../interfaces/TokenPayload.interface';
import { IAuthService } from '../interfaces/AuthService.interface';
import JWT from 'jsonwebtoken';
import env from '../../config/dotenv/dotenv.config';
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

  static async authentication({ email, password }: ILogin, emailDomain: number): Promise<IAuthentication | ApiError> {
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

  static async authorization({ id, role }: ITokenPayload): Promise<IAuthorizedUser | IAuthorizedDoctor | undefined> {
    try {
      if (role === roles.USER) {
        const user = await Users.getUser(id);
        const userFormatted: IAuthorizedUser = new UserDTO(user);
        return userFormatted;
      }
      if (role === roles.DOCTOR) {
        const doctor = await Doctors.getDoctor(id);
        const doctorFormatted = new DoctorDTO(doctor);
        return doctorFormatted;
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
      const user: INewUser = { ...newUser, role_id: id, password: encryptedPassword };
      await Users.createUser(user);
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

  static async doctorRegister(newDoctor: INewDoctor): Promise<void> {
    try {
      const { id } = await this.getRole(roles.DOCTOR);
      const encryptedPassword = await encryptPassword(newDoctor.password);
      const doctor: INewDoctor = { ...newDoctor, role_id: id, password: encryptedPassword };
      await Doctors.createDoctor(doctor);
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
