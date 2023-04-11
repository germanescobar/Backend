import { Backoffice } from './config/backoffice/backoffice';
import logger from './config/logger/winston.logger';

try {
  new Backoffice().start().catch(handleError);
} catch (error) {
  handleError(error);
}

process.on('uncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});

function handleError(e: any) {
  logger.error(e);
  process.exit(1);
}
