export interface ICart {
  products: product[];
  appointments: appointment[];
}

export type product = {
  id: string;
  product: string;
  image: string;
  dose: string;
  quantity: number;
  label: string;
  discount: number;
  price: number;
  stock: number;
};

export type appointment = {
  id: string;
  patientData: patientData;
  appointmentData: appointmentData;
};

export type patientData = {
  patientName: string;
  patientLastname: string;
  patientId: string;
  patientEmail: string;
  patientPhone: string;
  isAdult: string;
  patientGender: string;
  patientBirth: string;
};

export type appointmentData = {
  specialitySelected: string;
  preferredDoctorSelected: string;
  countrySelected: string;
  citySelected: string;
  appointmentDate: string;
  appointmentTime: string;
  consultationReasons: string;
  appointmentPrice: number;
};
