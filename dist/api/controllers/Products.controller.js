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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const Products_service_1 = require("../service/Products.service");
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const capitalize_utils_1 = require("../utils/capitalize.utils");
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
class ProductsController {
    constructor() { }
    static getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield Products_service_1.Products.getAllProducts();
                res.status(200).json(products);
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
    static getProductsByCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = req.params;
                const categoryCapitalized = (0, capitalize_utils_1.capitalize)(category);
                const products = yield Products_service_1.Products.getProductsByCategory(categoryCapitalized);
                res.status(200).json(products);
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
    static createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Products_service_1.Products.createProduct(req.body);
                res.status(201).json('CREATED');
            }
            catch (error) {
                if (error instanceof PrismaErrorHandler_middleware_1.default) {
                    if (error.status === 404)
                        return next(ApiError_middlewares_1.ApiError.NotFound());
                    if (error.status === 400)
                        return next(ApiError_middlewares_1.ApiError.BadRequest('The category already exist'));
                }
                return next(ApiError_middlewares_1.ApiError.Internal('Unknown Error'));
            }
        });
    }
    static updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { id } = _a, rest = __rest(_a, ["id"]);
                yield Products_service_1.Products.updateProduct(id, rest);
                res.status(200).json('UPDATED');
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
    static deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                yield Products_service_1.Products.deleteProduct(id);
                res.status(200).json('DELETED');
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
exports.ProductsController = ProductsController;
