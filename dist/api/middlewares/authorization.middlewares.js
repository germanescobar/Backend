"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const authorization_schema_1 = __importDefault(require("../schemas/authorization.schema"));
const dotenv_config_1 = __importDefault(require("../../config/dotenv/dotenv.config"));
const authorizationValidator = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.length)
            return next(ApiError_middlewares_1.ApiError.Internal('You must specify the roles that should be authorized'));
        if (!req.headers.authorization)
            return next(ApiError_middlewares_1.ApiError.Forbbiden());
        const ACCESS_TOKEN = req.headers.authorization.split(' ')[1];
        const { error } = authorization_schema_1.default.validate(ACCESS_TOKEN);
        if (error)
            return next(ApiError_middlewares_1.ApiError.Forbbiden());
        try {
            const { id, role } = jsonwebtoken_1.default.verify(ACCESS_TOKEN, dotenv_config_1.default.SECRET_JWT);
            if (!allowedRoles.includes(role))
                return next(ApiError_middlewares_1.ApiError.Forbbiden());
            req.user = {
                id,
                role,
            };
            req.body = Object.assign({}, req.body);
            return next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.JsonWebTokenError)
                return next(ApiError_middlewares_1.ApiError.Forbbiden());
            return next(ApiError_middlewares_1.ApiError.Internal('Something went wrong here!'));
        }
    };
};
exports.default = authorizationValidator;
