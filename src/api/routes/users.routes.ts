import { Router } from 'express';
import { UsersController } from '../controllers/Users.controller';
import { PRESET_CLOUDINARY } from '../utils/constants.utils';
import { allowedRoles } from '../utils/roles.utils';
import authorizationValidator from '../middlewares/authorization.middlewares';
import formData from '../middlewares/formData.middlewares';
import restrictInvalidUserUpdate from '../middlewares/userUpdater.middlewares';

const userRouter = Router();

userRouter.get('/', UsersController.allUsers);
userRouter.delete('/', UsersController.deleteUser);
userRouter.put(
  '/',
  authorizationValidator(allowedRoles.GENERAL),
  formData(PRESET_CLOUDINARY),
  restrictInvalidUserUpdate,
  UsersController.updateUser
);

export default userRouter;
