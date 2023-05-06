import { ICart } from './Cart.interface';

export interface IPayment {
  userId: string;
  paymentMethod: {
    id: string;
    card: card;
    type: string;
  };
  cart: ICart;
  amount: number;
}

export type card = { brand: string; country: string; exp_month: number; exp_year: number; last4: string };
