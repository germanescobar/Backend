import Joi from 'joi';

const payments = Joi.object({
  paymentMethod: Joi.object().required(),
  cart: Joi.object().required(),
  amount: Joi.number().required(),
});

export default payments;
