export interface ICart {
  products: product[];
}

type product = {
  id: string;
  product: string;
  image: string;
  dose: string;
  quantity: number;
  label: string;
  discount: number;
  price: number;
  stock: number;
};
