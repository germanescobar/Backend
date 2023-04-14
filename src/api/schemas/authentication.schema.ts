import Joi from 'joi';

const autenticationSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().max(16),
});

export default autenticationSchema;
