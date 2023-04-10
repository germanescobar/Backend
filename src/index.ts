import { Backoffice } from './config/backoffice/backoffice';

try {
  new Backoffice().start().catch(handleError);
} catch (error) {
  handleError(error);
}

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
  process.exit(1);
});

function handleError(e: any) {
  console.log(e);
  process.exit(1);
}
