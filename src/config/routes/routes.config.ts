import express from 'express';
import { Router } from '../../api/router/Router.routes';

export default function routes(app: express.Express) {
  const routes = new Router();
  app.use('/api/v1/users', routes.users);
  app.use('/api/v1/auth', routes.auth);
}
