export const roles = {
  ADMIN: 1000,
  DOCTOR: 1993,
  USER: 2023,
};

export const allowedRoles = {
  ADMIN: [roles.ADMIN],
  GENERAL: [roles.ADMIN, roles.USER, roles.DOCTOR],
  DOCTORS: [roles.ADMIN, roles.DOCTOR],
  USERS: [roles.ADMIN, roles.USER],
};
