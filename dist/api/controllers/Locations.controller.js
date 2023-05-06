"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsController = void 0;
const Locations_service_1 = require("../service/Locations.service");
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
class LocationsController {
    contructor() { }
    static getLocations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locations = yield Locations_service_1.Locations.getLocations();
                res.status(200).json(locations);
            }
            catch (error) {
                if (error instanceof PrismaErrorHandler_middleware_1.default) {
                    if (error.status === 404)
                        return next(ApiError_middlewares_1.ApiError.NotFound());
                    if (error.status === 400)
                        return next(ApiError_middlewares_1.ApiError.BadRequest());
                }
                return next(ApiError_middlewares_1.ApiError.Internal('Unknown Error'));
            }
        });
    }
}
exports.LocationsController = LocationsController;
