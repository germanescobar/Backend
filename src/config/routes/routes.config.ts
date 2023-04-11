import express from 'express';
import { Router } from '../../api/routes/Router.routes';

export default function routes(app: express.Express) {
  const routes = new Router();
  app.use('/api/v1/', routes.users);
}
