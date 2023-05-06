import { Router } from 'express';
import { allowedRoles } from '../utils/roles.utils';
import { AppointmentsController } from '../controllers/Appointments.controller';
import authorizationValidator from '../middlewares/authorization.middlewares';

const appointmentsRoute = Router();

appointmentsRoute.get('/', authorizationValidator(allowedRoles.GENERAL), AppointmentsController.appointments);

export default appointmentsRoute;
