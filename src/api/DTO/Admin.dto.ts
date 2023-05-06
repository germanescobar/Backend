import { IAdmin } from '../interfaces/Admin.interface';

export class AdminDTO {
  readonly name: string;
  readonly email: string;
  readonly role: number;
  constructor({ name, email, role_id }: IAdmin) {
    this.name = name;
    this.email = email;
    this.role = role_id.role;
  }
}
