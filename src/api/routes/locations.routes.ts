import { Router } from 'express';
//import LocationsController from '../controllers/Locations.controller';
const LocationsController = require('../controllers/Locations.controller');

const locationRouter = Router();

locationRouter.get('/', LocationsController.getLocations);

export default locationRouter;
