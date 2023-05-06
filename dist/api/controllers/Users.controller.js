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
exports.UsersController = void 0;
const client_1 = require("@prisma/client");
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const Users_service_1 = require("../service/Users.service");
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
const prisma = new client_1.PrismaClient();
class UsersController {
    constructor() { }
    static allUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Users_service_1.Users.getAllUsers();
                res.status(200).json(user);
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
    static deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                if (!id)
                    next(ApiError_middlewares_1.ApiError.Forbbiden());
                yield prisma.user.delete({
                    where: {
                        id: id,
                    },
                });
                res.status(200).json('DELETED');
            }
            catch (error) {
                next(ApiError_middlewares_1.ApiError.Internal(error.message));
            }
        });
    }
    static updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, role } = req.user;
                if (!id || !role)
                    next(ApiError_middlewares_1.ApiError.BadRequest());
                yield Users_service_1.Users.updateUser(id, req.body);
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
}
exports.UsersController = UsersController;
