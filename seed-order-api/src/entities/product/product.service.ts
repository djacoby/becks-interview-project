import {
  getGetAllProductsQuery,
  getGetProductByIdQuery,
  getCreateProductQuery,
  getUpdateProductQuery,
  getDeleteProductQuery,
  getUpdateProductInventoryQuery,
} from './product.queries';

import { type Product } from '../../interface';

import { executeQuery } from '../../execute-query';

/**
 * Get all products
 */
export const getAllProducts = async (): Promise<Product[]> => {
  const { query, replacements } = getGetAllProductsQuery();

  const result = await executeQuery(query, replacements);

  return result;
};

/**
 * Get product by id
 */
export const getProductById = async (id: number): Promise<Product> => {
  const { query, replacements } = getGetProductByIdQuery(id);

  const result = await executeQuery(query, replacements);

  return result;
};

/**
 * Create product
 */
export const createProduct = async (product: Product): Promise<Product> => {
  const { query, replacements } = getCreateProductQuery(product);

  const result = await executeQuery(query, replacements);

  return result;
};

/**
 * Update product
 */
export const updateProduct = async (
  productId: number,
  product: Product,
): Promise<Product> => {
  const { query, replacements } = getUpdateProductQuery(productId, product);

  const result = await executeQuery(query, replacements);

  return result;
};

/**
 * Delete product
 */
export const deleteProduct = async (id: number): Promise<Product> => {
  const { query, replacements } = getDeleteProductQuery(id);

  const result = await executeQuery(query, replacements);

  return result;
};

/**
 * Update product inventory
 */
export const updateProductInventory = async (
  productId: number,
  quantity: number,
): Promise<Partial<Product>> => {
  const { query, replacements } = getUpdateProductInventoryQuery(
    productId,
    quantity,
  );

  const result: Product = await executeQuery(query, replacements);

  if (result.stock < result.minimumStock) {
    console.log(`Product ${result.id} is below minimum stock`);
  }

  return result;
};
