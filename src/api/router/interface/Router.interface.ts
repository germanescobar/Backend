import { Router } from 'express';

export interface IRouter {
  users: Router;
  auth: Router;
  doctors: Router;
  products: Router;
  categories: Router;
  locations: Router;
}
