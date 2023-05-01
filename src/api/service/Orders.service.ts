import { PrismaClient } from '@prisma/client';
import { Order } from '../interfaces/Order.interface';

const prisma = new PrismaClient();

type id = {
  id: string;
};

export class Orders {
  constructor() {}

  static async createOrder({ userId, cart, amount, card, state }: Order): Promise<any> {
    try {
      // TO-DO: map the appointments when the user try to schedule one
      //const appointmentsId = cart.appointments.map((appointment) => ({ id: appointment.id }));
      if (Object.keys(cart).includes('products') && !Object.keys(cart).includes('appointments')) {
        const productsId = cart.products.map((product) => ({ id: product.id }));
        const { id } = await prisma.order.create({
          data: {
            user: { connect: { id: userId } },
            products: { connect: productsId.map((e) => e) },
            total: amount,
            brand: card.brand,
            country: card.country,
            exp_month: card.exp_month,
            exp_year: card.exp_year,
            last4: card.last4,
            state,
          },
        });
        return { id };
      }
    } catch (error) {
      throw error;
    }
  }

  static async confirmOrder(orderId: string, confirmation: string): Promise<id> {
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
