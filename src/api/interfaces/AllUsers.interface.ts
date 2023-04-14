export interface IUsers {
  id: string;
  name: string;
  lastname: string;
  username: string;
  avatar: string;
  email: string;
  phone: string;
  nationality: string;
  gender: Gender;
  birthday: Date;
  blood_type: string;
  password?: string;
  role: Role;
}

type Gender = 'Male' | 'Female' | 'No Binary';
type Role = 1993 | 2023 | 1000;
