import { Router } from 'express';
import { Auth } from '../controllers/Auth.controller';
import authenticationValidator from '../middlewares/authentication.middlewares';
import authorizationValidator from '../middlewares/authorization.middleware';

import registerUserValidator from '../middlewares/register.middlewares';

const authRouter = Router();

authRouter.post('/', authenticationValidator, Auth.authentication);
authRouter.post('/authorization', authorizationValidator, Auth.authorization);
authRouter.post('/register', registerUserValidator, Auth.register);
authRouter.post('/register/doctor', Auth.registerDoctor);

export default authRouter;
