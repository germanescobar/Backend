import { Router } from 'express';
import { UsersController } from '../controller/Users.controller';
import { PrismaClient } from '@prisma/client';

const userRouter = Router();
const prisma = new PrismaClient();
const usersController = new UsersController(prisma);

userRouter.get('/users', usersController.allUsers);
userRouter.post('/users', usersController.createUser);
userRouter.delete('/users', usersController.deleteUser);
userRouter.put('/users', usersController.updateUser);

export default userRouter;
