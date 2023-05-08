"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const userRegister_schema_1 = __importDefault(require("../schemas/userRegister.schema"));
const userRegisterValidator = (req, res, next) => {
    const { error } = userRegister_schema_1.default.validate(req.body);
    if (error)
        return next(ApiError_middlewares_1.ApiError.BadRequest());
    const { birthdate } = req.body;
    req.body = Object.assign(Object.assign({}, req.body), { birthdate: new Date(birthdate) });
    next();
};
exports.default = userRegisterValidator;
