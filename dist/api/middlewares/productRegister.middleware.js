"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const productRegister_schema_1 = __importDefault(require("../schemas/productRegister.schema"));
const productRegisterValidator = (req, res, next) => {
    const { error } = productRegister_schema_1.default.validate(req.body);
    if (error)
        return next(ApiError_middlewares_1.ApiError.BadRequest());
    const { price, stock, discount } = req.body;
    req.body = Object.assign(Object.assign({}, req.body), { price: +price * 100, stock: +stock, discount: +discount });
    next();
};
exports.default = productRegisterValidator;
