"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_utils_1 = require("../utils/roles.utils");
const Appointments_controller_1 = require("../controllers/Appointments.controller");
const authorization_middlewares_1 = __importDefault(require("../middlewares/authorization.middlewares"));
const appointmentsRoute = (0, express_1.Router)();
appointmentsRoute.get('/', (0, authorization_middlewares_1.default)(roles_utils_1.allowedRoles.GENERAL), Appointments_controller_1.AppointmentsController.appointments);
exports.default = appointmentsRoute;
