import {
  getCreateOrderQuery,
  getCreateOrderDetailsQuery,
} from './order.queries';

import { OrderProduct } from '../../interface';
import { executeQuery } from '../execute-query';

/**
 * Create order
 */
export const createOrder = async (customerId: number): Promise<number> => {
  const { query, replacements } = getCreateOrderQuery(customerId);

  const res = await executeQuery(query, replacements);

  return res[0].id;
};

/**
 * Create order details
 */
export const createOrderDetails = async (
  orderId: number,
  products: OrderProduct[],
): Promise<OrderProduct[]> => {
  const { query, replacements } = getCreateOrderDetailsQuery(orderId, products);

  const res = await executeQuery(query, replacements);

  return res;
};
