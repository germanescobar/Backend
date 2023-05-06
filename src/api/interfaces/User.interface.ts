import { Appointment } from '@prisma/client';
import { Order } from '@prisma/client';
import { Role } from '@prisma/client';

export interface IUser {
  id: string;
  name: string;
  lastname: string;
  username: string;
  avatar: string;
  email: string;
  phone: string;
  nationality: string;
  gender: string;
  birthdate: Date;
  blood_type: string;
  password: string;
  role_id: Role;
  roleId: string;
  appointments?: Appointment[];
  orders?: Order[];
  createdAt: Date;
  updatedAt: Date;
}
