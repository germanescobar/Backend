import { Router } from 'express';
import { Auth } from '../controllers/Auth.controller';
import authenticationValidator from '../middlewares/authentication.middlewares';
import authorizationValidator from '../middlewares/authorization.middlewares';
import userRegisterValidator from '../middlewares/userRegister.middlewares';
import doctorRegisterValidator from '../middlewares/doctorRegister.middlewares';
import formData from '../middlewares/formData.middlewares';

const authRouter = Router();

authRouter.post('/', authenticationValidator, Auth.authentication);
authRouter.post('/authorization', authorizationValidator, Auth.authorization);
authRouter.post('/register', userRegisterValidator, Auth.userRegister);
authRouter.post('/register/doctor', formData('doctors'), doctorRegisterValidator, Auth.doctorRegister);

export default authRouter;
