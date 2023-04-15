import { Appointment } from '@prisma/client';
import { Role } from '@prisma/client';
import { Area } from '@prisma/client';
import { Location } from '@prisma/client';

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
  location: Location;
  locationId: string;
  Area: Area;
  areaId: string;
  createdAt: Date;
  updatedAt: Date;
}
