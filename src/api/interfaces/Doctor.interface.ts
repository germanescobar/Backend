import { Appointment } from '@prisma/client';
import { Role } from '@prisma/client';
import { Area } from '@prisma/client';
import { Headquarter } from '@prisma/client';

export interface IDoctor {
  id: string;
  prefix: string;
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  phone: string;
  gender: string;
  birthdate: Date;
  introduction: string;
  qualifications: string[];
  memberships?: string[];
  skills: string[];
  appointments?: Appointment[];
  password: string;
  role_id: Role;
  roleId: string;
  headquarter: Headquarter;
  headquarterId: string;
  area: Area;
  areaId: string;
  createdAt: Date;
  updatedAt: Date;
}
