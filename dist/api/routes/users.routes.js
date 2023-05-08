"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_controller_1 = require("../controllers/Users.controller");
const constants_utils_1 = require("../utils/constants.utils");
const roles_utils_1 = require("../utils/roles.utils");
const authorization_middlewares_1 = __importDefault(require("../middlewares/authorization.middlewares"));
const formData_middlewares_1 = __importDefault(require("../middlewares/formData.middlewares"));
const userUpdater_middlewares_1 = __importDefault(require("../middlewares/userUpdater.middlewares"));
const userRouter = (0, express_1.Router)();
userRouter.get('/', Users_controller_1.UsersController.allUsers);
userRouter.delete('/', Users_controller_1.UsersController.deleteUser);
userRouter.put('/', (0, authorization_middlewares_1.default)(roles_utils_1.allowedRoles.USERS), (0, formData_middlewares_1.default)(constants_utils_1.PRESET_CLOUDINARY, constants_utils_1.USERS_FOLDER_CLOUDINARY), userUpdater_middlewares_1.default, Users_controller_1.UsersController.updateUser);
exports.default = userRouter;
