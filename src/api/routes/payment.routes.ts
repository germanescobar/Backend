import { Router } from 'express';
import authorizationValidator from '../middlewares/authorization.middlewares';
import paymentsValidator from '../middlewares/payments.middleware';
import { allowedRoles } from '../utils/roles.utils';
import { PaymentsController } from '../controllers/Payments.controller';

const paymentsRoute = Router();

paymentsRoute.post('/', authorizationValidator(allowedRoles.GENERAL), paymentsValidator, PaymentsController.checkout);

export default paymentsRoute;
