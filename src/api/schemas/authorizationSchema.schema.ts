import Joi from 'joi';

const authorizationSchema = Joi.string().required();

export default authorizationSchema;
