"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const authentication_schema_1 = __importDefault(require("../schemas/authentication.schema"));
const domainChecker_utils_1 = __importDefault(require("../utils/domainChecker.utils"));
const authenticationValidator = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        next(ApiError_middlewares_1.ApiError.BadRequest());
    const { error } = authentication_schema_1.default.validate({ email, password });
    if (error)
        return next(ApiError_middlewares_1.ApiError.BadRequest());
    const emailDomain = (0, domainChecker_utils_1.default)(email);
    req.body = Object.assign(Object.assign({}, req.body), { emailDomain });
    next();
};
exports.default = authenticationValidator;
