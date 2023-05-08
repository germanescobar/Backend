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
exports.Doctors = void 0;
const client_1 = require("@prisma/client");
const prismaErrorsCodes_utils_1 = require("../utils/prismaErrorsCodes.utils");
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const allDoctors_selectFields_1 = require("./selectFields/doctors/allDoctors.selectFields");
const encryptPWD_utils_1 = __importDefault(require("../utils/encryptPWD.utils"));
const winston_logger_1 = __importDefault(require("../../config/logger/winston.logger"));
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
const prisma = new client_1.PrismaClient();
class Doctors {
    constructor() { }
    static getAllDoctor() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield prisma.doctor.findMany({
                    select: allDoctors_selectFields_1.allDoctorsfields,
                });
                return response;
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.error(error);
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static getDoctor(searchValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield prisma.doctor.findFirstOrThrow({
                    where: {
                        OR: [{ id: searchValue }, { email: searchValue }, { firstname: searchValue }],
                    },
                    include: {
                        role_id: true,
                        area: true,
                        appointments: true,
                        headquarter: {
                            select: { city: true, address: true, location: { select: { country: true } } },
                        },
                    },
                }));
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.error(error);
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static getDoctorsAppointments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.doctor.findUniqueOrThrow({
                    where: { id },
                    select: {
                        appointments: {
                            select: {
                                date: true,
                                patient: { select: { firstname: true, lastname: true, phone: true, email: true, gender: true } },
                                scheduleAt: true,
                                reason: true,
                            },
                        },
                    },
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.error(error);
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static createDoctor(doctor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { headquarter: { city }, area, } = doctor;
                const { id: locationId } = yield this.getLocation(city);
                const { id: areaId } = yield this.getArea(area);
                yield prisma.doctor.create({
                    data: Object.assign(Object.assign({}, doctor), { headquarter: { connect: { id: locationId } }, area: { connect: { id: areaId } }, role_id: { connect: { id: doctor.role_id } } }),
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateDoctor(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { headquarter: { city }, area: { area }, id, } = data;
                const { id: locationId } = yield this.getLocation(city);
                const { id: areaId } = yield this.getArea(area);
                yield prisma.doctor.update({
                    where: {
                        id,
                    },
                    data: Object.assign(Object.assign({}, data), { headquarter: { connect: { id: locationId } }, area: { connect: { id: areaId } } }),
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.error(error);
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static updateDoctorByUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = data;
                if (password) {
                    const encryptedNewPassword = yield (0, encryptPWD_utils_1.default)(password);
                    yield prisma.doctor.update({
                        where: { id },
                        data: {
                            password: encryptedNewPassword,
                        },
                    });
                    return;
                }
                yield prisma.doctor.update({
                    where: { id },
                    data,
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.error(error);
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static deleteDoctor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.doctor.delete({
                    where: { id },
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.error(error);
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static getAreas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.area.findMany({
                    select: { id: true, area: true, price: true, doctors: true },
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.error(error);
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static getArea(area) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.area.findFirstOrThrow({
                    where: { area },
                    select: { id: true, area: true },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getLocation(city) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.headquarter.findFirstOrThrow({
                    where: { city },
                    select: { id: true },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Doctors = Doctors;
