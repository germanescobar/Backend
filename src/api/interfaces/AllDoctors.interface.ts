import { Appointment } from '@prisma/client';

export interface IAllDoctors {
  id: string;
  prefix: string;
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  phone: string;
  gender: string;
  birthdate: Date;
  introduction: string | null;
  qualifications: string[];
  memberships?: string[];
  skills: string[];
  appointments: Appointment[];
  createdAt: Date;
  updatedAt: Date;
  area: {
    area: string;
    price: any;
    createdAt: Date;
    updatedAt: Date;
  };
  headquarter: {
    city: string;
    address: string;
    createdAt: Date;
  };
}
