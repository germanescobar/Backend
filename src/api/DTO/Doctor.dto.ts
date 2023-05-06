import { IDoctor } from '../interfaces/Doctor.interface';

export class DoctorDTO {
  readonly id;
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
  readonly role;

  constructor({
    id,
    prefix,
    firstname,
    lastname,
    avatar,
    email,
    phone,
    gender,
    birthdate,
    introduction,
    headquarter: {
      city,
      address,
      location: { country },
    },
    area: { area, price },
    qualifications,
    memberships,
    skills,
    appointments,
    role_id: { role },
  }: IDoctor) {
    this.id = id;
    this.prefix = prefix;
    this.firstname = firstname;
    this.lastname = lastname;
    this.avatar = avatar;
    this.email = email;
    this.phone = phone;
    this.gender = gender;
    this.birthdate = birthdate;
    this.introduction = introduction;
    this.location = { city, address, country };
    this.area = { area, price };
    this.qualifications = qualifications;
    this.memberships = memberships;
    this.skills = skills;
    this.appointments = appointments;
    this.role = role;
  }
}

export const doctorDTO = (doctor: IDoctor[] | IDoctor) => {
  if (Array.isArray(doctor)) {
    return doctor.map((e) => {
      return { ...new DoctorDTO(e) };
    });
  }
  return new DoctorDTO(doctor);
};
