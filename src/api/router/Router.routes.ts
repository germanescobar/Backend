import userRouter from '../routes/users.routes';
import authRouter from '../routes/authorization.routes';
import doctorRouter from '../routes/doctors.routes';
import { IRouter } from './interface/Router.interface';

export class Router implements IRouter {
  readonly users;
  readonly auth;
  readonly doctors;
  constructor() {
    this.users = userRouter;
    this.auth = authRouter;
    this.doctors = doctorRouter;
  }
}
