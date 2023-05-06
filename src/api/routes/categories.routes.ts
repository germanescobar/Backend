import { Router } from 'express';
import { CategoriesController } from '../controllers/Categories.controller';

const categoriesRouter = Router();

categoriesRouter.get('/', CategoriesController.getCategories);

export default categoriesRouter;
