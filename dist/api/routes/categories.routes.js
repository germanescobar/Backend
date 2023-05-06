"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Categories_controller_1 = require("../controllers/Categories.controller");
const categoriesRouter = (0, express_1.Router)();
categoriesRouter.get('/', Categories_controller_1.CategoriesController.getCategories);
exports.default = categoriesRouter;
