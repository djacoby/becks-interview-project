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
exports.deleteProductController = exports.updateProductController = exports.createProductController = exports.getProductByIdController = exports.getAllProductsController = void 0;
const product_service_1 = require("./product.service");
/**
 * Get all products controller
 */
const getAllProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, product_service_1.getAllProducts)();
    if (!products) {
        res.status(404).json({ message: 'No products found' });
    }
    res.status(200).json(products);
});
exports.getAllProductsController = getAllProductsController;
/**
 * Get product by id controller
 */
const getProductByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield (0, product_service_1.getProductById)(Number(id));
    if (!product) {
        res.status(404).json({ message: 'No product found' });
    }
    res.status(200).json(product);
});
exports.getProductByIdController = getProductByIdController;
/**
 * Create product controller
 */
const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    const newProduct = yield (0, product_service_1.createProduct)(product);
    if (!newProduct) {
        res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(newProduct);
});
exports.createProductController = createProductController;
/**
 * Update product controller
 */
const updateProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = req.body;
    console.log(req.body);
    if (!product && !id) {
        res.status(400).json({ message: 'Bad request' });
    }
    const updatedProduct = yield (0, product_service_1.updateProduct)(+id, product);
    if (!updatedProduct) {
        res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(updatedProduct);
});
exports.updateProductController = updateProductController;
/**
 * Delete product controller
 */
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'Bad request' });
    }
    const deletedProduct = yield (0, product_service_1.deleteProduct)(Number(id));
    if (!deletedProduct) {
        res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(deletedProduct);
});
exports.deleteProductController = deleteProductController;
