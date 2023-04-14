import { PrismaClient } from '@prisma/client';
import { IUser } from '../interfaces/User.interface';

const prisma = new PrismaClient();

export class Users {
  constructor() {}

  static async getUser(searchValue: string): Promise<IUser> {
    try {
      return (await prisma.user.findFirstOrThrow({
        where: {
          OR: [{ id: searchValue }, { email: searchValue }],
        },

        include: {
          role_id: true,
        },
      })) as IUser;
    } catch (error) {
      throw error;
    }
  }
}
