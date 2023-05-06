"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_logger_1 = __importDefault(require("../logger/winston.logger"));
function handleSignal(signal, server) {
    winston_logger_1.default.error(`Received ${signal}. Shutting down.`);
    server.close(() => {
        process.exit(0);
    });
    setTimeout(() => {
        winston_logger_1.default.info('Could not close server in time. Forcibly terminating process.');
        process.exit(1);
    }, 10000);
}
exports.default = handleSignal;
