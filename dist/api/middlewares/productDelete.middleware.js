"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const productDelete_schema_1 = __importDefault(require("../schemas/productDelete.schema"));
const productDeleteValidator = (req, res, next) => {
    const { id } = req.body;
    const { error } = productDelete_schema_1.default.validate(id);
    if (error)
        next(ApiError_middlewares_1.ApiError.BadRequest('You must provide a product id'));
    next();
};
exports.default = productDeleteValidator;
