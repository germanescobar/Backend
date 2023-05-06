"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const payments_schema_1 = __importDefault(require("../schemas/payments.schema"));
const appointments_schema_1 = __importDefault(require("../schemas/appointments.schema"));
const paymentsValidator = (req, res, next) => {
    const { error } = payments_schema_1.default.validate(req.body);
    if (error)
        return next(ApiError_middlewares_1.ApiError.BadRequest('Error validating your purchase'));
    const { cart } = req.body;
    if (!!cart.appointments) {
        const { error } = appointments_schema_1.default.validate(cart.appointments);
        if (error)
            return next(ApiError_middlewares_1.ApiError.BadRequest('Please, check your appointment data to schedule it'));
    }
    const { amount } = req.body;
    req.body = Object.assign(Object.assign({}, req.body), { amount: Math.round(amount * 100) });
    next();
};
exports.default = paymentsValidator;
