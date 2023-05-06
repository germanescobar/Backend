"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Locations_controller_1 = require("../controllers/Locations.controller");
const locationRouter = (0, express_1.Router)();
locationRouter.get('/', Locations_controller_1.LocationsController.getLocations);
exports.default = locationRouter;
