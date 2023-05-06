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
exports.Users = void 0;
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
const winston_logger_1 = __importDefault(require("../../config/logger/winston.logger"));
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const client_1 = require("@prisma/client");
const prismaErrorsCodes_utils_1 = require("../utils/prismaErrorsCodes.utils");
const encryptPWD_utils_1 = __importDefault(require("../utils/encryptPWD.utils"));
const prisma = new client_1.PrismaClient();
class Users {
    constructor() { }
    static getUser(searchValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield prisma.user.findFirstOrThrow({
                    where: {
                        OR: [{ id: searchValue }, { email: searchValue }],
                    },
                    include: {
                        role_id: true,
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
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findMany();
                return user;
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
    static getUserAppointments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.user.findUniqueOrThrow({
                    where: { id },
                    select: {
                        appointments: {
                            select: {
                                area: { select: { area: true } },
                                date: true,
                                doctor: { select: { firstname: true, lastname: true, email: true, phone: true } },
                                headquarter: { select: { address: true, city: true } },
                                patient: { select: { firstname: true, lastname: true } },
                                scheduleAt: true,
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
    static createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.user.create({ data: Object.assign(Object.assign({}, newUser), { role_id: { connect: { id: newUser.role_id } } }) });
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
    static updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = data;
                if (password) {
                    const encryptedNewPassword = yield (0, encryptPWD_utils_1.default)(password);
                    yield prisma.user.update({
                        where: { id },
                        data: { password: encryptedNewPassword },
                    });
                    return;
                }
                yield prisma.user.update({
                    where: {
                        id,
                    },
                    data: Object.assign({}, data),
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
}
exports.Users = Users;
