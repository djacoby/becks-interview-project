import { type Request, type Response } from 'express';

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './product.service';

/**
 * Get all products controller
 */
export const getAllProductsController = async (
  _req: Request,
  res: Response,
) => {
  const products = await getAllProducts();

  if (!products) {
    res.status(404).json({ message: 'No products found' });
  }

  res.status(200).json(products);
};

/**
 * Get product by id controller
 */
export const getProductByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await getProductById(Number(id));

  if (!product) {
    res.status(404).json({ message: 'No product found' });
  }

  res.status(200).json(product);
};

/**
 * Create product controller
 */
export const createProductController = async (req: Request, res: Response) => {
  const product = req.body;

  const newProduct = await createProduct(product);

  if (!newProduct) {
    res.status(500).json({ message: 'Internal server error' });
  }

  res.status(200).json(newProduct);
};

/**
 * Update product controller
 */
export const updateProductController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = req.body;

  console.log(req.body);

  if (!product && !id) {
    res.status(400).json({ message: 'Bad request' });
  }

  const updatedProduct = await updateProduct(+id, product);

  if (!updatedProduct) {
    res.status(500).json({ message: 'Internal server error' });
  }

  res.status(200).json(updatedProduct);
};

/**
 * Delete product controller
 */
export const deleteProductController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'Bad request' });
  }

  const deletedProduct = await deleteProduct(Number(id));

  if (!deletedProduct) {
    res.status(500).json({ message: 'Internal server error' });
  }

  res.status(200).json(deletedProduct);
};
