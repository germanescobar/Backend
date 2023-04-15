import Joi from 'joi';

const authenticationSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().max(16),
});

export default authenticationSchema;
