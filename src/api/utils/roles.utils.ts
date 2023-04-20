export const roles = {
  ADMIN: 1000,
  USER: 2023,
  DOCTOR: 1993,
};

export const allowedRoles = {
  ADMIN: [1000],
  GENERAL: [2023, 1993, 1000],
};
