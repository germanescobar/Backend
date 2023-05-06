import Joi from 'joi';

const productUpdateSchema = Joi.object({
  product: Joi.string(),
  label: Joi.string(),
  description: Joi.string(),
  price: Joi.string(),
  stock: Joi.string(),
  image: Joi.string(),
  dose: Joi.string(),
  discount: Joi.string(),
});

export default productUpdateSchema;
