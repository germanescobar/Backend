import { Router } from 'express';

export interface IRouter {
  users: Router;
  auth: Router;
  doctors: Router;
  appointments: Router;
  products: Router;
  categories: Router;
  locations: Router;
  payments: Router;
}
