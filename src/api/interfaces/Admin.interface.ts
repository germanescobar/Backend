import { Role } from '@prisma/client';

export interface IAdmin {
  id: string;
  name: string;
  email: string;
  password: string;
  roleId: string;
  role_id: Role;
}
