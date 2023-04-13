import { Router } from 'express';
import { Auth } from '../controllers/Auth.controller';
import loginValidator from '../middlewares/login.middlewares';

const authRouter = Router();

authRouter.post('/', loginValidator, Auth.login);
authRouter.post('/register', loginValidator, Auth.login);

export default authRouter;
