export interface IOrderCreated {
  id: string;
  productsData?: { id: string; quantity: number }[];
}
