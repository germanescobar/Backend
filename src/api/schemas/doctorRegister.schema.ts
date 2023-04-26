import Joi from 'joi';
import { VALID_DOCTOR_DOMAIN } from '../utils/constants.utils';

const doctorRegisterSchema = Joi.object({
  prefix: Joi.string().required().default('Dr'),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  area: Joi.string().required(),
  avatar: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).regex(VALID_DOCTOR_DOMAIN).required(),
  phone: Joi.string().required(),
  gender: Joi.string().required(),
  birthdate: Joi.date().required(),
  qualifications: Joi.array().items(Joi.string()).required(),
  memberships: Joi.array().items(Joi.string()),
  skills: Joi.array().items(Joi.string()).required(),
  password: Joi.string().required(),
  headquarter: Joi.object({
    city: Joi.string().required(),
    country: Joi.string().required(),
  }),
});

export default doctorRegisterSchema;
