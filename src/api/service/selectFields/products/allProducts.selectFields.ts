export const allProductsFields = {
  id: true,
  product: true,
  label: true,
  price: true,
  stock: true,
  dose: true,
  image: true,
  discount: true,
  description: true,
  category: {
    select: {
      name: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};
