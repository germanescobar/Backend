interface IAppointments {
  area: {
    area: string;
  };
  date: Date;
  doctor: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  };
  headquarter: {
    address: string;
    city: string;
  };
  patient: {
    firstname: string;
    lastname: string;
  };
  scheduleAt: string;
}

export interface IUserAppointments {
  appointments: IAppointments[];
}
