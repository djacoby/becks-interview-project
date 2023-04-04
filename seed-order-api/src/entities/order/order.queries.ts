import { type Query, type OrderProduct } from '../../interface';

/**
 * Get query to create order
 */
export const getCreateOrderQuery = (customerId: number): Query => {
  return {
    query: `
      INSERT INTO seed_order ("customerId")
      VALUES ($1)
      RETURNING id;
    `,
    replacements: [customerId],
  };
};

/**
 * Get query to create order details
 */
export const getCreateOrderDetailsQuery = (
  orderId: number,
  products: OrderProduct[],
): Query => {
  const values = products
    .map((product: OrderProduct) => {
      return `(${orderId}, ${product.productId}, ${product.quantity})`;
    })
    .join(', ');
  return {
    query: `
      INSERT INTO order_details ("orderId", "productId", quantity)
      VALUES ${values}
      RETURNING "productId", "quantity";
    `,
    replacements: [],
  };
};
