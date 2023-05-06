import { Router } from 'express';
import { ProductsController } from '../controllers/Products.controller';
import { allowedRoles } from '../utils/roles.utils';
import { PRESET_CLOUDINARY, PRODUCTS_FOLDER_CLOUDINARY } from '../utils/constants.utils';
import restrictInvalidProductUpdate from '../middlewares/productUpdater.middleware';
import authorizationValidator from '../middlewares/authorization.middlewares';
import formData from '../middlewares/formData.middlewares';
import productRegisterValidator from '../middlewares/productRegister.middleware';
import productDeleteValidator from '../middlewares/productDelete.middleware';
import productUpdateValidator from '../middlewares/productUpdate.middleware';

const productsRouter = Router();

productsRouter.get('/', ProductsController.getAllProducts);

productsRouter.get('/:category', ProductsController.getProductsByCategory);

productsRouter.post(
  '/',
  authorizationValidator(allowedRoles.ADMIN),
  formData(PRESET_CLOUDINARY, PRODUCTS_FOLDER_CLOUDINARY),
  productRegisterValidator,
  ProductsController.createProduct
);

productsRouter.put(
  '/',
  authorizationValidator(allowedRoles.ADMIN),
  formData(PRESET_CLOUDINARY, PRODUCTS_FOLDER_CLOUDINARY),
  restrictInvalidProductUpdate,
  productUpdateValidator,
  ProductsController.updateProduct
);

productsRouter.delete(
  '/',
  authorizationValidator(allowedRoles.ADMIN),
  productDeleteValidator,
  ProductsController.deleteProduct
);

export default productsRouter;
