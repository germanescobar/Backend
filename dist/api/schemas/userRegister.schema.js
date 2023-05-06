"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userRegisterSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email(),
    phone: joi_1.default.string().required(),
    nationality: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    birthdate: joi_1.default.date().max('now').required(),
    blood_type: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.default = userRegisterSchema;
