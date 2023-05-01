import express from 'express';
import { Router } from '../../api/router/Router.routes';

export default function routes(app: express.Express) {
  const routes = new Router();
  app.use('/api/v1/users', routes.users);
  app.use('/api/v1/auth', routes.auth);
  app.use('/api/v1/doctors', routes.doctors);
  app.use('/api/v1/products', routes.products);
  app.use('/api/v1/categories', routes.categories);
  app.use('/api/v1/locations', routes.locations);
  app.use('/api/v1/payments', routes.payments);
}
