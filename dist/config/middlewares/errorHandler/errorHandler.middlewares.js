"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_middlewares_1 = require("./ApiError.middlewares");
const winston_logger_1 = __importDefault(require("../../logger/winston.logger"));
function errorHandler(error, req, res, next) {
    if (error instanceof ApiError_middlewares_1.ApiError) {
        winston_logger_1.default.error(`${error.status}: ${error.message}`);
        return res.status(error.status).json(error.message);
    }
    winston_logger_1.default.error('500: Something went wrong!!!!', error);
    return res.status(500).json('Something went wrong');
}
exports.default = errorHandler;
