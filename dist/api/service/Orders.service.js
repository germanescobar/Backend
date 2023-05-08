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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const client_1 = require("@prisma/client");
const Appointments_service_1 = require("./Appointments.service");
const prisma = new client_1.PrismaClient();
class Orders {
    constructor() { }
    static createOrder({ userId, cart, amount, card, state }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { brand, country, exp_month, exp_year, last4 } = card;
                const { appointments } = cart;
                if (Object.keys(cart).includes('products') && !Object.keys(cart).includes('appointments')) {
                    const productsId = cart.products.map((product) => ({ id: product.id }));
                    const productsData = cart.products.map((product) => ({ id: product.id, quantity: product.quantity }));
                    const { id } = yield prisma.order.create({
                        data: {
                            user: { connect: { id: userId } },
                            products: { connect: productsId.map((e) => e) },
                            total: amount,
                            brand,
                            country,
                            exp_month,
                            exp_year,
                            last4,
                            state,
                        },
                    });
                    return { id, productsData };
                }
                if (Object.keys(cart).includes('appointments') && !Object.keys(cart).includes('products')) {
                    const appointmentsId = yield Appointments_service_1.Appointments.createAppointment(appointments, userId);
                    const { id } = yield prisma.order.create({
                        data: {
                            user: { connect: { id: userId } },
                            appointments: { connect: appointmentsId.map((e) => e) },
                            total: amount,
                            brand,
                            country,
                            exp_month,
                            exp_year,
                            last4,
                            state,
                        },
                    });
                    return { id };
                }
                const productsId = cart.products.map((product) => ({ id: product.id }));
                const productsData = cart.products.map((product) => ({ id: product.id, quantity: product.quantity }));
                const appointmentsId = yield Appointments_service_1.Appointments.createAppointment(appointments, userId);
                const { id } = yield prisma.order.create({
                    data: {
                        user: { connect: { id: userId } },
                        products: { connect: productsId.map((e) => e) },
                        appointments: { connect: appointmentsId.map((e) => e) },
                        total: amount,
                        brand,
                        country,
                        exp_month,
                        exp_year,
                        last4,
                        state,
                    },
                });
                return { id, productsData };
            }
            catch (error) {
                throw error;
            }
        });
    }
    static confirmOrder(orderId, confirmation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = yield prisma.order.update({
                    where: { id: orderId },
                    data: { state: confirmation },
                });
                return { id };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Orders = Orders;
