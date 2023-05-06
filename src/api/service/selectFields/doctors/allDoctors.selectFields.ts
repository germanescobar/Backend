export const allDoctorsfields = {
  id: true,
  prefix: true,
  firstname: true,
  lastname: true,
  avatar: true,
  email: true,
  phone: true,
  gender: true,
  birthdate: true,
  introduction: true,
  qualifications: true,
  memberships: true,
  skills: true,
  appointments: true,
  area: {
    select: {
      area: true,
      price: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  headquarter: {
    select: {
      location: {
        select: {
          country: true,
        },
      },
      city: true,
      address: true,
      createdAt: true,
    },
  },
  updatedAt: true,
  createdAt: true,
};
