import { Backoffice } from './config/backoffice/backoffice';
import logger from './config/logger/winston.logger';
import handleSignal from './config/signal/handlerSignal.signal';

try {
  const server = new Backoffice().start().catch(handleError);
  process.on('SIGINT', () => handleSignal('SIGINT', server));
  process.on('SIGTERM', () => handleSignal('SIGTERM', server));
  process.on('SIGQUIT', () => handleSignal('SIGTERM', server));
} catch (error) {
  handleError(error);
}

process.on('uncaughtException', (err) => {
  logger.error('UncaughtException Bye!');
  process.exit(1);
});

function handleError(e: any) {
  logger.error(e);
  process.exit(1);
}
