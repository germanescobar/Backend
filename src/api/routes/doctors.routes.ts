import { Router } from 'express';
import { DoctorsController } from '../controllers/Doctors.controller';
import { PRESET_CLOUDINARY, DOCTORS_FOLDER_CLOUDINARY } from '../utils/constants.utils';
import { allowedRoles } from '../utils/roles.utils';
import formData from '../middlewares/formData.middlewares';
import restrictInvalidDoctorUpdate from '../middlewares/doctorUpdater.middlewares';
import authorizationValidator from '../middlewares/authorization.middlewares';
import isValidEmail from '../middlewares/isValidEmail.middleware';

const doctorRouter = Router();

doctorRouter.get('/', DoctorsController.getAllDoctors);
doctorRouter.get('/areas', DoctorsController.getDoctorsAreas);
doctorRouter.put(
  '/',
  authorizationValidator(allowedRoles.DOCTORS),
  formData(PRESET_CLOUDINARY, DOCTORS_FOLDER_CLOUDINARY),
  restrictInvalidDoctorUpdate,
  DoctorsController.updateDoctors
);
doctorRouter.patch(
  '/',
  authorizationValidator(allowedRoles.DOCTORS),
  formData(PRESET_CLOUDINARY, DOCTORS_FOLDER_CLOUDINARY),
  isValidEmail,
  DoctorsController.updateDoctorByUser
);
doctorRouter.delete('/', authorizationValidator(allowedRoles.ADMIN), DoctorsController.deleteDoctors);

export default doctorRouter;
