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
exports.Locations = void 0;
const client_1 = require("@prisma/client");
const prismaErrorsCodes_utils_1 = require("../utils/prismaErrorsCodes.utils");
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const winston_logger_1 = __importDefault(require("../../config/logger/winston.logger"));
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
const prisma = new client_1.PrismaClient();
class Locations {
    constructor() { }
    static getLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locations = yield prisma.location.findMany({
                    include: { headquarters: { select: { city: true, address: true } } },
                });
                return locations;
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
    static getLocation(searchValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.headquarter.findFirst({
                    where: {
                        OR: [{ id: searchValue }, { city: searchValue }],
                    },
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
exports.Locations = Locations;
