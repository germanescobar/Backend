"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const constants_utils_1 = require("../utils/constants.utils");
const doctorRegisterSchema = joi_1.default.object({
    prefix: joi_1.default.string().required().default('Dr'),
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    area: joi_1.default.string().required(),
    avatar: joi_1.default.string().required(),
    email: joi_1.default.string().email({ minDomainSegments: 2 }).regex(constants_utils_1.VALID_DOCTOR_DOMAIN).required(),
    phone: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    birthdate: joi_1.default.date().required(),
    qualifications: joi_1.default.array().items(joi_1.default.string()).required(),
    memberships: joi_1.default.array().items(joi_1.default.string()),
    skills: joi_1.default.array().items(joi_1.default.string()).required(),
    password: joi_1.default.string().required(),
    headquarter: joi_1.default.object({
        city: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
    }),
});
exports.default = doctorRegisterSchema;
