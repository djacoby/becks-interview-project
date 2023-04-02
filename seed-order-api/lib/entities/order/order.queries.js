"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreateOrderDetailsQuery = exports.getCreateOrderQuery = void 0;
/**
 * Get query to create order
 */
const getCreateOrderQuery = (customerId) => {
    return {
        query: `
      INSERT INTO seed_order ("customerId")
      VALUES ($1)
      RETURNING id;
    `,
        replacements: [customerId],
    };
};
exports.getCreateOrderQuery = getCreateOrderQuery;
/**
 * Get query to create order details
 */
const getCreateOrderDetailsQuery = (orderId, products) => {
    const values = products
        .map((product) => {
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
exports.getCreateOrderDetailsQuery = getCreateOrderDetailsQuery;
