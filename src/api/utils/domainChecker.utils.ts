import { roles } from './roles.utils';

const domainChecker = (email: string) => {
  if (email.match(/(@drmebid)/g)) return roles.DOCTOR;
  if (email.match(/(@mebid)/g)) return roles.ADMIN;
  return roles.USER;
};

export default domainChecker;
