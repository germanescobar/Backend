import { Request, Response, NextFunction } from 'express';

const productUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
  const { price, stock, discount } = req.body;
  req.body = {
    ...req.body,
    price: Number(parseFloat(price) * 100),
    stock: +stock,
    discount: +discount,
  };
  next();
};

export default productUpdateValidator;
