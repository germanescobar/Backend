import { IUser } from '../interfaces/User.interface';

export class UserDTO {
  readonly username;
  readonly avatar;
  readonly email;
  readonly phone;
  readonly nationality;
  readonly gender;
  readonly birthdate;
  readonly blood_type;
  readonly role;

  constructor({
    username,
    avatar,
    email,
    phone,
    nationality,
    gender,
    birthdate,
    blood_type,
    role_id: { role },
  }: IUser) {
    this.username = username;
    this.avatar = avatar;
    this.email = email;
    this.phone = phone;
    this.nationality = nationality;
    this.gender = gender;
    this.birthdate = birthdate;
    this.blood_type = blood_type;
    this.role = role;
  }
}
