import Joi from 'joi';

const doctorRegisterSchema = Joi.object({
  prefix: Joi.string().required().default('Dr'),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  area: Joi.string().required(),
  avatar: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .regex(/^[a-zA-Z0-9._%+-]+@drmebid\.com$/)
    .required(),
  phone: Joi.string().required(),
  gender: Joi.string().required(),
  birthdate: Joi.date().required(),
  qualifications: Joi.array().items(Joi.string()).required(),
  memberships: Joi.array().items(Joi.string()),
  skills: Joi.array().items(Joi.string()).required(),
  password: Joi.date().required(),
  location: Joi.object({
    city: Joi.string().required(),
    country: Joi.string().required(),
  }),
});

export default doctorRegisterSchema;
