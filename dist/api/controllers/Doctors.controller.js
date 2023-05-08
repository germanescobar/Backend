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
exports.DoctorsController = void 0;
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const Doctors_service_1 = require("../service/Doctors.service");
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
class DoctorsController {
    constructor() { }
    static getAllDoctors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctors = yield Doctors_service_1.Doctors.getAllDoctor();
                res.status(200).json(doctors);
            }
            catch (error) {
                if (error instanceof PrismaErrorHandler_middleware_1.default) {
                    if (error.status === 404)
                        return next(ApiError_middlewares_1.ApiError.NotFound());
                    if (error.status === 400)
                        return next(ApiError_middlewares_1.ApiError.Forbbiden());
                }
                return next(ApiError_middlewares_1.ApiError.Internal('Unknown Error'));
            }
        });
    }
    static updateDoctors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, role } = req.user;
                if (!id || !role)
                    return next(ApiError_middlewares_1.ApiError.BadRequest());
                yield Doctors_service_1.Doctors.updateDoctor(req.body);
                res.status(200).json('UPDATED');
            }
            catch (error) {
                if (error instanceof PrismaErrorHandler_middleware_1.default) {
                    if (error.status === 404)
                        return next(ApiError_middlewares_1.ApiError.NotFound());
                    if (error.status === 400)
                        return next(ApiError_middlewares_1.ApiError.Forbbiden());
                }
                return next(ApiError_middlewares_1.ApiError.Internal('Unknown Error'));
            }
        });
    }
    static updateDoctorByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, role } = req.user;
                if (!id || !role)
                    return next(ApiError_middlewares_1.ApiError.BadRequest());
                yield Doctors_service_1.Doctors.updateDoctorByUser(id, req.body);
                res.status(200).json('UPDATED');
            }
            catch (error) {
                if (error instanceof PrismaErrorHandler_middleware_1.default) {
                    if (error.status === 404)
                        return next(ApiError_middlewares_1.ApiError.NotFound());
                    if (error.status === 400)
                        return next(ApiError_middlewares_1.ApiError.Forbbiden());
                }
                return next(ApiError_middlewares_1.ApiError.Internal('Unknown Error'));
            }
        });
    }
    static deleteDoctors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.user;
                const { id: idDoctor } = req.body;
                if (!id || !idDoctor)
                    return next(ApiError_middlewares_1.ApiError.BadRequest());
                yield Doctors_service_1.Doctors.deleteDoctor(idDoctor);
                res.status(200).json('DELETED');
            }
            catch (error) {
                if (error instanceof PrismaErrorHandler_middleware_1.default) {
                    if (error.status === 404)
                        return next(ApiError_middlewares_1.ApiError.NotFound());
                    if (error.status === 400)
                        return next(ApiError_middlewares_1.ApiError.Forbbiden());
                }
                return next(ApiError_middlewares_1.ApiError.Internal('Unknown Error'));
            }
        });
    }
    static getDoctorsAreas(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const areas = yield Doctors_service_1.Doctors.getAreas();
                res.status(200).json(areas);
            }
            catch (error) {
                if (error instanceof PrismaErrorHandler_middleware_1.default) {
                    if (error.status === 404)
                        return next(ApiError_middlewares_1.ApiError.NotFound());
                    if (error.status === 400)
                        return next(ApiError_middlewares_1.ApiError.Forbbiden());
                }
                return next(ApiError_middlewares_1.ApiError.Internal('Unknown Error'));
            }
        });
    }
}
exports.DoctorsController = DoctorsController;
