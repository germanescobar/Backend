import { User } from '@prisma/client';

export interface IUserResponse extends Omit<User, 'roleId'> {
  role: number;
}
