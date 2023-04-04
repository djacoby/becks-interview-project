import {
  getCreateOrderQuery,
  getCreateOrderDetailsQuery,
} from './order.queries';

import { type Order, type OrderProduct } from '../../interface';
import { executeQuery } from '../../execute-query';

/**
 * Create order
 */
export const createOrder = async (customerId: number): Promise<Order> => {
  const { query, replacements } = getCreateOrderQuery(customerId);

  const result = await executeQuery(query, replacements);

  return result;
};

/**
 * Create order details
 */
export const createOrderDetails = async (
  orderId: number,
  products: OrderProduct[],
): Promise<OrderProduct[]> => {
  const { query, replacements } = getCreateOrderDetailsQuery(orderId, products);

  const result = await executeQuery(query, replacements);

  return [result];
};
