import { ICart } from './Cart.interface';
import { card } from './Payment.interface';

export interface IOrder {
  userId: string;
  cart: ICart;
  amount: number;
  card: card;
  state: string;
}
