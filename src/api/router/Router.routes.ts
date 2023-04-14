import userRouter from '../routes/users.routes';
import authRouter from '../routes/authorization.routes';
import { IRouter } from './interface/Router.interface';

export class Router implements IRouter {
  readonly users;
  readonly auth;
  constructor() {
    this.users = userRouter;
    this.auth = authRouter;
  }
}
