"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const productUpdateSchema = joi_1.default.object({
    product: joi_1.default.string(),
    label: joi_1.default.string(),
    description: joi_1.default.string(),
    price: joi_1.default.string(),
    stock: joi_1.default.string(),
    image: joi_1.default.string(),
    dose: joi_1.default.string(),
    discount: joi_1.default.string(),
});
exports.default = productUpdateSchema;
