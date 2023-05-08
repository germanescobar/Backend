"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Locations_controller_1 = __importDefault(require("../controllers/Locations.controller"));
const locationRouter = (0, express_1.Router)();
locationRouter.get('/', Locations_controller_1.default.getLocations);
exports.default = locationRouter;
