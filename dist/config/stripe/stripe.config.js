"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const dotenv_config_1 = __importDefault(require("../dotenv/dotenv.config"));
const stripe = new stripe_1.default(dotenv_config_1.default.STRIPE_KEY, { apiVersion: '2022-11-15' });
exports.default = stripe;
