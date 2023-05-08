"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.File({
            filename: `${__dirname}/../../../logs/errors.log`,
            maxFiles: 10,
            maxsize: 5120000,
            level: 'error',
            format: winston_1.format.combine(winston_1.format.simple(), winston_1.format.timestamp(), winston_1.format.printf((info) => `${info.timestamp} ${info.level} ${info.message}`)),
        }),
    ],
});
if (process.env.NODE_ENV === 'development') {
    logger.add(new winston_1.transports.Console({
        level: 'info',
        format: winston_1.format.combine(winston_1.format.simple(), winston_1.format.timestamp(), winston_1.format.printf((info) => `${info.timestamp}: ${info.message}`)),
    }));
}
exports.default = logger;
