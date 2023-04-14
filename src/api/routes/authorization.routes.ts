import { Router } from 'express';
import { Auth } from '../controllers/Auth.controller';
import loginValidator from '../middlewares/login.middlewares';
import registerValidator from '../middlewares/register.middlewares';

const authRouter = Router();

authRouter.post('/', loginValidator, Auth.login);
authRouter.post('/register', registerValidator, Auth.register);

export default authRouter;
