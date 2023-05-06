export interface INewDoctor {
  prefix: string;
  firstname: string;
  lastname: string;
  area: string;
  avatar: string;
  email: string;
  phone: string;
  gender: string;
  birthdate: Date;
  qualifications: string[];
  memberships?: string[];
  skills: string[];
  password: string;
  headquarter: Headquarter;
  role_id: string;
}

type Headquarter = {
  city: string;
  country: string;
};
