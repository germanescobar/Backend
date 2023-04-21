import Joi from 'joi';

const productRegisterSchema = Joi.object({
  product: Joi.string(),
  label: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  stock: Joi.number(),
  image: Joi.string(),
  dose: Joi.string(),
  discount: Joi.number(),
  category: Joi.string(),
  newCategory: Joi.string().optional().allow(''),
});

export default productRegisterSchema;
