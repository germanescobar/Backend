import { Router } from 'express';
import { UsersController } from '../controllers/Users.controller';

const userRouter = Router();

userRouter.get('/', UsersController.allUsers);
userRouter.post('/', UsersController.createUser);
userRouter.delete('/', UsersController.deleteUser);
userRouter.put('/', UsersController.updateUser);

export default userRouter;
