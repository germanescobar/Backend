"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const backoffice_1 = require("./config/backoffice/backoffice");
const winston_logger_1 = __importDefault(require("./config/logger/winston.logger"));
const handlerSignal_signal_1 = __importDefault(require("./config/signal/handlerSignal.signal"));
try {
    const server = new backoffice_1.Backoffice().start().catch(handleError);
    process.on('SIGINT', () => (0, handlerSignal_signal_1.default)('SIGINT', server));
    process.on('SIGTERM', () => (0, handlerSignal_signal_1.default)('SIGTERM', server));
    process.on('SIGQUIT', () => (0, handlerSignal_signal_1.default)('SIGTERM', server));
}
catch (error) {
    handleError(error);
}
process.on('uncaughtException', (err) => {
    winston_logger_1.default.error('UncaughtException Bye!');
    process.exit(1);
});
function handleError(e) {
    winston_logger_1.default.error(e);
    process.exit(1);
}
