export interface IAllProducts {
  id: string;
  product: string;
  label: string;
  price: number;
  stock: number;
  dose: string;
  image: string;
  discount: number;
  description: string;
  category: {
    category: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
