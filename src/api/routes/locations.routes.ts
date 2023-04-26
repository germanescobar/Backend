import { Router } from 'express';
import { LocationsController } from '../controllers/locations.controller';

const locationRouter = Router();

locationRouter.get('/', LocationsController.getLocations);

export default locationRouter;
