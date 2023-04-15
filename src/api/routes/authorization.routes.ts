import { Router } from 'express';
import { Auth } from '../controllers/Auth.controller';
import authenticationValidator from '../middlewares/authentication.middlewares';
import authorizationValidator from '../middlewares/authorization.middleware';

import registerValidator from '../middlewares/register.middlewares';

const authRouter = Router();

authRouter.post('/', authenticationValidator, Auth.authentication);
authRouter.post('/authorization', authorizationValidator, Auth.authorization);
authRouter.post('/register', registerValidator, Auth.register);

export default authRouter;
