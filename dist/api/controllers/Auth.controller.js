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
exports.Auth = void 0;
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const Auth_service_1 = require("../service/Auth.service");
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
class Auth {
    static authentication(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, emailDomain } = req.body;
                const token = yield Auth_service_1.AuthService.authentication({ email, password }, emailDomain);
                if (token instanceof ApiError_middlewares_1.ApiError)
                    return next(ApiError_middlewares_1.ApiError.Unauthorized());
                res.status(200).json(token);
            }
            catch (error) {
                if (error instanceof PrismaErrorHandler_middleware_1.default) {
                    if (error.status === 404)
                        return next(ApiError_middlewares_1.ApiError.NotFound());
                    if (error.status === 400)
                        return next(ApiError_middlewares_1.ApiError.Unauthorized());
                }
                return next(ApiError_middlewares_1.ApiError.Internal('Unknown Error'));
            }
        });
    }
    static authorization(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenPayload = req.user;
                const authenticatedAccount = yield Auth_service_1.AuthService.authorization(tokenPayload);
                res.status(200).json(authenticatedAccount);
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
    static userRegister(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Auth_service_1.AuthService.userRegister(req.body);
                res.status(201).json('CREATED');
            }
            catch (error) {
                if (error instanceof PrismaErrorHandler_middleware_1.default) {
                    if (error.status === 500) {
                        return next(ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma'));
                    }
                    return next(ApiError_middlewares_1.ApiError.BadRequest());
                }
                return next(ApiError_middlewares_1.ApiError.Internal('Unknown Error'));
            }
        });
    }
    static doctorRegister(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Auth_service_1.AuthService.doctorRegister(req.body);
                res.status(201).json('CREATED');
            }
            catch (error) {
                if (error instanceof PrismaErrorHandler_middleware_1.default) {
                    if (error.status === 500) {
                        return next(ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma'));
                    }
                    return next(ApiError_middlewares_1.ApiError.BadRequest());
                }
                return next(ApiError_middlewares_1.ApiError.Internal('Unknown Error'));
            }
        });
    }
}
exports.Auth = Auth;
