import Joi from 'joi';

const productDeleteSchema = Joi.string().required();

export default productDeleteSchema;
