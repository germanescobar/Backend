export interface IAuthorizedDoctor {
  prefix: string;
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  phone: string;
  gender: string;
  birthdate: Date;
  introduction: string;
  location: Location;
  area: Area;
  qualifications: string[];
  memberships?: string[];
  skills: string[];
  appointment?: Appointment[];
}

type Appointment = {
  patient: Patient;
  patientEmail: string;
  date: Date;
  scheduleAt: Date;
  reason: string;
};

type Location = {
  country: string;
  city: string;
  address: string;
};
type Area = {
  area: string;
  price: any;
};

type Patient = {
  firstname: string;
  lastname: string;
  isAdult: string;
  email: string;
};
