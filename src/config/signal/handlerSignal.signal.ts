import logger from '../logger/winston.logger';

export default function handleSignal(signal: string, server: any) {
  logger.error(`Received ${signal}. Shutting down.`);
  server.close(() => {
    process.exit(0);
  });

  setTimeout(() => {
    logger.info('Could not close server in time. Forcibly terminating process.');
    process.exit(1);
  }, 10000);
}
