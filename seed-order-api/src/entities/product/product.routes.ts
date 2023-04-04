import { Router } from 'express';

import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from './product.controller';

/**
 * Product router
 */
export const router = Router();

/**
 * GET /product
 * Get all products
 */
router.get(`/`, getAllProductsController);

/**
 * GET /product/:id
 * Get product by id
 */
router.get(`/:id`, getProductByIdController);

/**
 * POST /product
 * Create product
 */
router.post(`/`, createProductController);

/**
 * PUT /product/:id
 * Update product
 */
router.put(`/:id`, updateProductController);

/**
 * DELETE /product/:id
 */
router.delete(`/:id`, deleteProductController);
