import { PrismaClient } from '@prisma/client';
import { Appointments } from './Appointments.service';
import { IOrder } from '../interfaces/Order.interface';
import { IIdentification } from '../interfaces/Identification.interface';
import { IOrderCreated } from '../interfaces/OrderCreated.interface';

const prisma = new PrismaClient();

export class Orders {
  constructor() {}

  static async createOrder({ userId, cart, amount, card, state }: IOrder): Promise<IOrderCreated> {
    try {
      const { brand, country, exp_month, exp_year, last4 } = card;
      const { appointments } = cart;

      if (Object.keys(cart).includes('products') && !Object.keys(cart).includes('appointments')) {
        const productsId = cart.products.map((product) => ({ id: product.id }));
        const productsData = cart.products.map((product) => ({ id: product.id, quantity: product.quantity }));
        const { id } = await prisma.order.create({
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
        const appointmentsId = await Appointments.createAppointment(appointments, userId);
        const { id } = await prisma.order.create({
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
      const appointmentsId = await Appointments.createAppointment(appointments, userId);
      const { id } = await prisma.order.create({
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
    } catch (error) {
      throw error;
    }
  }

  static async confirmOrder(orderId: string, confirmation: string): Promise<IIdentification> {
    try {
      const { id } = await prisma.order.update({
        where: { id: orderId },
        data: { state: confirmation },
      });
      return { id };
    } catch (error) {
      throw error;
    }
  }
}
