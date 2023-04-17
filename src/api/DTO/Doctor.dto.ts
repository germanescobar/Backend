import { IDoctor } from '../interfaces/Doctor.interface';

export class DoctorDTO {
  readonly prefix;
  readonly firstname;
  readonly lastname;
  readonly avatar;
  readonly email;
  readonly phone;
  readonly gender;
  readonly birthdate;
  readonly introduction;
  readonly location;
  readonly area;
  readonly qualifications;
  readonly memberships;
  readonly skills;
  readonly appointments;

  constructor({
    prefix,
    firstname,
    lastname,
    avatar,
    email,
    phone,
    gender,
    birthdate,
    introduction,
    location: { country, city, address },
    area: { area, price },
    qualifications,
    memberships,
    skills,
    appointments,
  }: IDoctor) {
    this.prefix = prefix;
    this.firstname = firstname;
    this.lastname = lastname;
    this.avatar = avatar;
    this.email = email;
    this.phone = phone;
    this.gender = gender;
    this.birthdate = birthdate;
    this.introduction = introduction;
    this.location = { country, city, address };
    this.area = { area, price };
    this.qualifications = qualifications;
    this.memberships = memberships;
    this.skills = skills;
    this.appointments = appointments;
  }
}
