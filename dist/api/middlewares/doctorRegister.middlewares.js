"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const doctorRegister_schema_1 = __importDefault(require("../schemas/doctorRegister.schema"));
const doctorRegisterValidator = (req, res, next) => {
    const { birthdate, password } = req.body;
    const parsed = JSON.parse(birthdate);
    const newDate = new Date(parsed);
    req.body = Object.assign(Object.assign({}, req.body), { birthdate: newDate, password });
    const { error } = doctorRegister_schema_1.default.validate(req.body);
    if (error)
        return next(ApiError_middlewares_1.ApiError.BadRequest());
    next();
};
exports.default = doctorRegisterValidator;
