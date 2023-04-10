import { Server } from '../server/server.config';
import env from '../dotenv/dotenv.config';

export class Backoffice {
  server?: Server;

  async start() {
    this.server = new Server(+env.PORT);
    return this.server?.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    return this.server?.stop();
  }
}
