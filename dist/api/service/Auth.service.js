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
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const Users_service_1 = require("./Users.service");
const Doctors_service_1 = require("./Doctors.service");
const Admin_service_1 = require("./Admin.service");
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const User_dto_1 = require("../DTO/User.dto");
const Doctor_dto_1 = require("../DTO/Doctor.dto");
const Authentication_dto_1 = require("../DTO/Authentication.dto");
const Admin_dto_1 = require("../DTO/Admin.dto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_config_1 = __importDefault(require("../../config/dotenv/dotenv.config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const encryptPWD_utils_1 = __importDefault(require("../utils/encryptPWD.utils"));
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
const prismaErrorsCodes_utils_1 = require("../utils/prismaErrorsCodes.utils");
const roles_utils_1 = require("../utils/roles.utils");
const winston_logger_1 = __importDefault(require("../../config/logger/winston.logger"));
const prisma = new client_1.PrismaClient();
class AuthService {
    constructor() { }
    static authentication({ email, password }, emailDomain) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let authenticatedAccount;
                if (emailDomain === roles_utils_1.roles.USER)
                    authenticatedAccount = yield Users_service_1.Users.getUser(email);
                if (emailDomain === roles_utils_1.roles.DOCTOR)
                    authenticatedAccount = yield Doctors_service_1.Doctors.getDoctor(email);
                if (emailDomain === roles_utils_1.roles.ADMIN)
                    authenticatedAccount = yield Admin_service_1.Admin.getAdmin(email);
                if (!authenticatedAccount)
                    return ApiError_middlewares_1.ApiError.Unauthorized();
                const isAuth = yield bcrypt_1.default.compare(password, authenticatedAccount.password);
                if (!isAuth)
                    return ApiError_middlewares_1.ApiError.Unauthorized();
                const tokenPayload = Object.assign({}, new Authentication_dto_1.AuthenticationDTO(authenticatedAccount));
                const token = this.signToken(tokenPayload);
                return token;
            }
            catch (error) {
                if (error instanceof PrismaErrorHandler_middleware_1.default) {
                    winston_logger_1.default.error(error);
                    winston_logger_1.default.info('Prisma error:', error);
                    if (error.status === 400)
                        throw error;
                }
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.error(error);
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static signToken(payload) {
        const ACCESS_TOKEN = jsonwebtoken_1.default.sign(payload, dotenv_config_1.default.SECRET_JWT, {
            expiresIn: this.expToken,
        });
        return { ACCESS_TOKEN };
    }
    static authorization({ id, role, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (role === roles_utils_1.roles.USER) {
                    const user = yield Users_service_1.Users.getUser(id);
                    const userFormatted = new User_dto_1.UserDTO(user);
                    return userFormatted;
                }
                if (role === roles_utils_1.roles.DOCTOR) {
                    const doctor = yield Doctors_service_1.Doctors.getDoctor(id);
                    const doctorFormatted = new Doctor_dto_1.DoctorDTO(doctor);
                    return doctorFormatted;
                }
                if (role === roles_utils_1.roles.ADMIN) {
                    const admin = yield Admin_service_1.Admin.getAdmin(id);
                    const adminFormatted = new Admin_dto_1.AdminDTO(admin);
                    return adminFormatted;
                }
                throw ApiError_middlewares_1.ApiError.BadRequest();
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.error(error);
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static userRegister(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = yield this.getRole(roles_utils_1.roles.USER);
                const encryptedPassword = yield (0, encryptPWD_utils_1.default)(newUser.password);
                const user = Object.assign(Object.assign({}, newUser), { role_id: id, password: encryptedPassword });
                yield Users_service_1.Users.createUser(user);
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
    static doctorRegister(newDoctor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = yield this.getRole(roles_utils_1.roles.DOCTOR);
                const encryptedPassword = yield (0, encryptPWD_utils_1.default)(newDoctor.password);
                const doctor = Object.assign(Object.assign({}, newDoctor), { role_id: id, password: encryptedPassword });
                yield Doctors_service_1.Doctors.createDoctor(doctor);
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
    static getRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.role.findFirstOrThrow({
                    where: {
                        role,
                    },
                    select: {
                        id: true,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
AuthService.expToken = Math.floor(Date.now() / 1000) + 60 * 60;
exports.AuthService = AuthService;
