import Joi from 'Joi';

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().required(),
  nationality: Joi.string().required(),
  gender: Joi.string().required(),
  birthdate: Joi.date().max('now').required(),
  blood_type: Joi.string().required(),
  password: Joi.string().required(),
});

export default userRegisterSchema;
