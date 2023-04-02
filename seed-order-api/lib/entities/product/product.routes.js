"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
/**
 * Product router
 */
exports.router = (0, express_1.Router)();
/**
 * GET /product
 * Get all products
 */
exports.router.get(`/`, (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, product_service_1.getAllProducts)();
        if (!products) {
            res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json({ message: 'All products' });
    }
    catch (ex) {
        next(ex);
    }
}));
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
