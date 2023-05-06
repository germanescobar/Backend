import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  transports: [
    new transports.File({
      filename: `${__dirname}/../../../logs/errors.log`,
      maxFiles: 10,
      maxsize: 5120000,
      level: 'error',
      format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf((info) => `${info.timestamp} ${info.level} ${info.message}`)
      ),
    }),
  ],
});

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf((info) => `${info.timestamp}: ${info.message}`)
      ),
    })
  );
}

export default logger;
