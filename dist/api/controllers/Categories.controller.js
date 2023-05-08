"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const Categories_service_1 = require("../service/Categories.service");
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
class CategoriesController {
    constructor() { }
    static getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield Categories_service_1.Categories.getCategories();
                res.status(200).json(categories);
            }
            catch (error) {
                if (error instanceof PrismaErrorHandler_middleware_1.default) {
                    if (error.status === 404)
                        return next(ApiError_middlewares_1.ApiError.NotFound());
                    if (error.status === 400)
                        return next(ApiError_middlewares_1.ApiError.BadRequest());
                }
                return next(ApiError_middlewares_1.ApiError.Internal('Unknown Error'));
            }
        });
    }
}
exports.CategoriesController = CategoriesController;
