export interface INewProduct {
  product: string;
  label: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  dose: string;
  discount: number;
  category: string;
  newCategory?: string;
}
