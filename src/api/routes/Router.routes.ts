import userRouter from '../users/route/users.router';
import { IRouter } from './interface';

export class Router implements IRouter {
  readonly users;
  constructor() {
    this.users = userRouter;
  }
}
