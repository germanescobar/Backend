"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_middlewares_1 = __importDefault(require("../middlewares/authorization.middlewares"));
const payments_middleware_1 = __importDefault(require("../middlewares/payments.middleware"));
const roles_utils_1 = require("../utils/roles.utils");
const Payments_controller_1 = require("../controllers/Payments.controller");
const paymentsRoute = (0, express_1.Router)();
paymentsRoute.post('/', (0, authorization_middlewares_1.default)(roles_utils_1.allowedRoles.GENERAL), payments_middleware_1.default, Payments_controller_1.PaymentsController.checkout);
exports.default = paymentsRoute;
