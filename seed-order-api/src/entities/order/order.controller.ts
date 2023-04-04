import { type Request, type Response } from 'express';

import { createOrder, createOrderDetails } from './order.service';
import { updateProductInventory } from '../product/product.service';

import {
  OrderWithProducts,
  type CustomerOrder,
  type Order,
} from '../../interface';

export const createOrderController = async (req: Request, res: Response) => {
  const order: CustomerOrder = req.body;

  const orderCreated: Order = await createOrder(order.customerId);

  if (!orderCreated) {
    res.status(500).json({ message: 'Internal server error' });
  }

  const products = await createOrderDetails(orderCreated.id, order.products);

  if (!products) {
    res.status(500).json({ message: 'Internal server error' });
  }

  const updateStockProms = products.map(async (product) => {
    return updateProductInventory(product.productId, product.quantity);
  });

  await Promise.all(updateStockProms).catch((err) => {
    console.log(err);
  });

  const newOrder: OrderWithProducts = {
    ...orderCreated,
    products,
  };

  res.status(200).json(newOrder);
};
