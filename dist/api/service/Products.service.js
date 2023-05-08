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
exports.Products = void 0;
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
const winston_logger_1 = __importDefault(require("../../config/logger/winston.logger"));
const client_1 = require("@prisma/client");
const prismaErrorsCodes_utils_1 = require("../utils/prismaErrorsCodes.utils");
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const allProducts_selectFields_1 = require("./selectFields/products/allProducts.selectFields");
const prisma = new client_1.PrismaClient();
class Products {
    constructor() { }
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield prisma.product.findMany({
                    select: allProducts_selectFields_1.allProductsFields,
                });
                return products;
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static getProductsByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.product.findMany({
                    where: {
                        category: { name: category },
                    },
                    select: allProducts_selectFields_1.allProductsFields,
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static createProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, newCategory } = newProduct, remainingProps = __rest(newProduct, ["category", "newCategory"]);
                if (!newCategory) {
                    const { id } = yield this.getCategory(category);
                    yield prisma.product.create({
                        data: Object.assign(Object.assign({}, remainingProps), { category: { connect: { id } } }),
                    });
                    return;
                }
                const { id } = yield this.createCategory(newCategory);
                yield prisma.product.create({
                    data: Object.assign(Object.assign({}, remainingProps), { category: { connect: { id } } }),
                });
                return;
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.error(error);
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.product.delete({
                    where: {
                        id,
                    },
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes400.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 400);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static updateProduct(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.product.update({
                    where: { id },
                    data: Object.assign({}, data),
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static updateProductStock(productsData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const { id, quantity } of productsData) {
                    yield prisma.product.update({
                        where: { id },
                        data: {
                            stock: { decrement: quantity },
                        },
                    });
                }
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    winston_logger_1.default.info('Prisma error:', error);
                    if (prismaErrorsCodes_utils_1.prismaErrorsCodes404.includes(error.code))
                        throw new PrismaErrorHandler_middleware_1.default(error.message, 404);
                    throw new PrismaErrorHandler_middleware_1.default(error.message, 500);
                }
                throw ApiError_middlewares_1.ApiError.Internal('Error unknown in Prisma');
            }
        });
    }
    static createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.category.create({
                    data: { name: category },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.category.findFirstOrThrow({
                    where: {
                        name: category,
                    },
                    select: {
                        id: true,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Products = Products;
