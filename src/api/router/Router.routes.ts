import userRouter from '../routes/users.routes';
import authRouter from '../routes/authorization.routes';
import doctorRouter from '../routes/doctors.routes';
import appointmentsRoute from '../routes/appointments.route';
import productsRouter from '../routes/products.routes';
import categoriesRouter from '../routes/categories.routes';
import locationRouter from '../routes/locations.routes';
import paymentsRoute from '../routes/payment.routes';
import { IRouter } from './interface/Router.interface';

export class Router implements IRouter {
  readonly users;
  readonly auth;
  readonly doctors;
  readonly products;
  readonly categories;
  readonly locations;
  readonly payments;
  readonly appointments;
  constructor() {
    this.users = userRouter;
    this.auth = authRouter;
    this.doctors = doctorRouter;
    this.appointments = appointmentsRoute;
    this.products = productsRouter;
    this.categories = categoriesRouter;
    this.locations = locationRouter;
    this.payments = paymentsRoute;
  }
}
