import {
  getGetAllProductsQuery,
  getGetProductByIdQuery,
  getCreateProductQuery,
  getUpdateProductQuery,
  getDeleteProductQuery,
  getUpdateProductInventoryQuery,
} from './product.queries';

import { Product } from '../../interface';

import { executeQuery } from '../execute-query';

/**
 * Get all products
 */
export const getAllProducts = async (): Promise<Product[]> => {
  const { query, replacements } = getGetAllProductsQuery();

  const res = await executeQuery(query, replacements);

  return res;
};

/**
 * Get product by id
 */
export const getProductById = async (id: number): Promise<Product> => {
  const { query, replacements } = getGetProductByIdQuery(id);

  const res = await executeQuery(query, replacements);

  return res[0];
};

/**
 * Create product
 */
export const createProduct = async (product: Product): Promise<Product> => {
  const { query, replacements } = getCreateProductQuery(product);

  const res = await executeQuery(query, replacements);

  return res[0];
};

/**
 * Update product
 */
export const updateProduct = async (
  productId: number,
  product: Product,
): Promise<Product> => {
  const { query, replacements } = getUpdateProductQuery(productId, product);

  const res = await executeQuery(query, replacements);

  return res[0];
};

/**
 * Delete product
 */
export const deleteProduct = async (id: number): Promise<Product> => {
  const { query, replacements } = getDeleteProductQuery(id);

  const res = await executeQuery(query, replacements);

  return res[0];
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

  const res: Product[] = await executeQuery(query, replacements);

  res.forEach((product) => {
    if (product.stock < product.minimumStock) {
      console.log(`Product ${product.id} is below minimum stock`);
    }
  });

  return res[0];
};
