import { PrismaClient } from '@prisma/client';
import { ILogin } from '../interfaces/Login.interface';
import { IUser } from '../interfaces/User.interface';
import { IUserResponse } from '../interfaces/UserResponse.interface';
import roles from '../utils/roles.utils';

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
      console.log(user);
      return user;
    } catch (error: any) {
      throw error;
    }
  }
}

// {
//   role_id: { role },
//   roleId,
//   ...userData
// }
