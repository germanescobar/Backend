import express from 'express';
import * as http from 'http';
import middlewares from '../middlewares/middlewares.config';
import routes from '../routes/routes.config';
import errorHandler from '../middlewares/errorHandler/errorHandler.middlewares';
import logger from '../logger/winston.logger';

export class Server {
  readonly express: express.Express;
  readonly port: number;
  httpServer: http.Server;

  constructor(port: number) {
    this.port = port;
    this.express = express();
    middlewares(this.express);
    routes(this.express);
    this.express.use(errorHandler);
    this.httpServer = http.createServer(this.express);
  }

  async listen(): Promise<http.Server> {
    return new Promise((resolve) => {
      this.httpServer.listen(this.port, () => {
        logger.info(`🚀 Server running on port ${this.port}`);
        logger.info('Press ctrl + c to stop');
        resolve(this.httpServer);
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }
      resolve();
    });
  }
}
