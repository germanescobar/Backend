import { Router } from 'express';
import { LocationsController } from 'src/api/controllers/Locations.controller';

const locationRouter = Router();

locationRouter.get('/', LocationsController.getLocations);

export default locationRouter;
