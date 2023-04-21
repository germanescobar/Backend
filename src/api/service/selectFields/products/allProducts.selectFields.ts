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
      category: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};
