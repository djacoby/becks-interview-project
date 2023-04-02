"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
/**
 * Product router
 */
exports.router = (0, express_1.Router)();
/**
 * GET /product
 * Get all products
 */
exports.router.get(`/`, product_controller_1.getAllProductsController);
/**
 * GET /product/:id
 * Get product by id
 */
exports.router.get(`/:id`, product_controller_1.getProductByIdController);
/**
 * POST /product
 * Create product
 */
exports.router.post(`/`, product_controller_1.createProductController);
/**
 * PUT /product/:id
 * Update product
 */
exports.router.put(`/:id`, product_controller_1.updateProductController);
/**
 * DELETE /product/:id
 */
exports.router.delete(`/:id`, product_controller_1.deleteProductController);
