import { PrismaClient } from '@prisma/client';
import { IUser } from '../interfaces/User.interface';
import { INewUser } from '../interfaces/NewUser.interface';

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

  static async createUser(newUser: INewUser): Promise<void> {
    try {
      await prisma.user.create({ data: { ...newUser, role_id: { connect: { id: newUser.role_id } } } });
    } catch (error) {
      throw error;
    }
  }
}
