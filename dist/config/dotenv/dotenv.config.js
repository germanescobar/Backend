"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const invariant_1 = __importDefault(require("invariant"));
(0, dotenv_1.config)();
(0, invariant_1.default)(process.env.APP_PORT, 'A port must be declared');
exports.default = {
    PORT: process.env.APP_PORT || 4545,
    SECRET_JWT: process.env.SECRET_JWT,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    ADMIN_KEY: process.env.ADMIN_KEY,
    STRIPE_KEY: process.env.STRIPE_KEY,
    SMTP_EMAIL: process.env.SMTP_EMAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};
