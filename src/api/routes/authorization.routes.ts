import { Router } from 'express';
import { Auth } from '../controllers/Auth.controller';
import { PRESET_CLOUDINARY, USERS_FOLDER_CLOUDINARY, DOCTORS_FOLDER_CLOUDINARY } from '../utils/constants.utils';
import { allowedRoles } from '../utils/roles.utils';
import authenticationValidator from '../middlewares/authentication.middlewares';
import authorizationValidator from '../middlewares/authorization.middlewares';
import userRegisterValidator from '../middlewares/userRegister.middlewares';
import doctorRegisterValidator from '../middlewares/doctorRegister.middlewares';
import formData from '../middlewares/formData.middlewares';

const authRouter = Router();

authRouter.post('/', authenticationValidator, Auth.authentication);
authRouter.post('/authorization', authorizationValidator(allowedRoles.GENERAL), Auth.authorization);
authRouter.post(
  '/register',
  formData(PRESET_CLOUDINARY, USERS_FOLDER_CLOUDINARY),
  userRegisterValidator,
  Auth.userRegister
);
authRouter.post(
  '/register/doctor',
  authorizationValidator(allowedRoles.ADMIN),
  formData(PRESET_CLOUDINARY, DOCTORS_FOLDER_CLOUDINARY),
  doctorRegisterValidator,
  Auth.doctorRegister
);

export default authRouter;
