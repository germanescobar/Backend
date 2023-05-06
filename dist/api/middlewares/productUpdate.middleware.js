"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productUpdateValidator = (req, res, next) => {
    const { price, stock, discount } = req.body;
    req.body = Object.assign(Object.assign({}, req.body), { price: +price, stock: +stock, discount: +discount });
    next();
};
exports.default = productUpdateValidator;
