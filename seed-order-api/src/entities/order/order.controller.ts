import { Request, Response } from 'express';

import { createOrder, createOrderDetails } from './order.service';
import { updateProductInventory } from '../product/product.service';

import { CustomerOrder, Order } from '../../interface';

export const createOrderController = async (req: Request, res: Response) => {
  const order: CustomerOrder = req.body;

  const orderId = await createOrder(order.customerId);

  if (!orderId) {
    res.status(500).json({ message: 'Internal server error' });
  }

  const products = await createOrderDetails(orderId, order.products);

  if (!products) {
    res.status(500).json({ message: 'Internal server error' });
  }

  const updateStockProms = products.map(async (product) => {
    return updateProductInventory(product.productId, product.quantity);
  });

  await Promise.all(updateStockProms).catch((err) => {
    console.log(err);
  });

  const newOrder: Order = {
    products,
    id: orderId,
    customerId: order.customerId,
    created: Date.now().toString(),
  };

  res.status(200).json(newOrder);
};
