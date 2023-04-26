import { Area, Headquarter } from '@prisma/client';

export interface IUpdateDataDoctor {
  id: string;
  firstname: string;
  lastname: string;
  area: Area;
  phone: string;
  gender: string;
  email: string;
  qualifications: string[];
  memberships: string[];
  skills: string[];
  headquarter: Headquarter;
  avatar: string;
}
