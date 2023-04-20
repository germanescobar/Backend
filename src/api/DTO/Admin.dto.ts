import { IAdmin } from '../interfaces/Admin.interface';

export class AdminDTO {
  readonly name: string;
  readonly email: string;
  constructor({ name, email }: IAdmin) {
    this.name = name;
    this.email = email;
  }
}
