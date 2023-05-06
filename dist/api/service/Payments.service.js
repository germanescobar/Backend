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
exports.Payments = void 0;
const stripe_config_1 = __importDefault(require("../../config/stripe/stripe.config"));
const client_1 = require("@prisma/client");
const Orders_service_1 = require("./Orders.service");
const Products_service_1 = require("./Products.service");
const Notifications_service_1 = require("./Notifications.service");
const ApiError_middlewares_1 = require("../../config/middlewares/errorHandler/ApiError.middlewares");
const prismaErrorsCodes_utils_1 = require("../utils/prismaErrorsCodes.utils");
const winston_logger_1 = __importDefault(require("../../config/logger/winston.logger"));
const PrismaErrorHandler_middleware_1 = __importDefault(require("../../config/middlewares/errorHandler/PrismaErrorHandler.middleware"));
class Payments {
    constructor() { }
    static processPayment({ paymentMethod, cart, amount, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = paymentMethod;
                const card = paymentMethod.card;
                const { status: state, id: paymentId } = yield stripe_config_1.default.paymentIntents.create({
                    currency: 'USD',
                    payment_method: id,
                    amount: amount,
                });
                const order = {
                    userId,
                    cart,
                    amount,
                    card,
                    state,
                };
                const { id: orderId, productsData } = yield Orders_service_1.Orders.createOrder(order);
                if (orderId) {
                    const { status } = yield stripe_config_1.default.paymentIntents.confirm(paymentId);
                    yield Orders_service_1.Orders.confirmOrder(orderId, status);
                    yield Notifications_service_1.Notifications.sendEmail(userId, orderId);
                    if (productsData) {
                        yield Products_service_1.Products.updateProductStock(productsData);
                    }
                    return { orderId };
                }
                throw ApiError_middlewares_1.ApiError.Internal('Something went wrong with your purchase please call your nearest dev!');
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
                throw ApiError_middlewares_1.ApiError.Internal('Error at payment process');
            }
        });
    }
}
exports.Payments = Payments;
