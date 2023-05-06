"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allProductsFields = void 0;
exports.allProductsFields = {
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
