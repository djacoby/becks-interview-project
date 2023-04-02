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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const product_queries_1 = require("./product.queries");
const storage_1 = require("../storage");
/**
 * Get all products
 */
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, storage_1.getDb)();
    db.connect();
    const { query, replacements } = (0, product_queries_1.getGetAllProductsQuery)();
    const res = yield db.query(query, replacements);
    db.end();
    return res.rows;
});
exports.getAllProducts = getAllProducts;
/**
 * Get product by id
 */
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, storage_1.getDb)();
    db.connect();
    const { query, replacements } = (0, product_queries_1.getGetProductByIdQuery)(id);
    const res = yield db.query(query, replacements);
    db.end();
    return res.rows[0];
});
exports.getProductById = getProductById;
/**
 * Create product
 */
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, storage_1.getDb)();
    db.connect();
    const { query, replacements } = (0, product_queries_1.getCreateProductQuery)(product);
    const res = yield db.query(query, replacements);
    db.end();
    return res.rows[0];
});
exports.createProduct = createProduct;
/**
 * Update product
 */
const updateProduct = (productId, product) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, storage_1.getDb)();
    db.connect();
    const { query, replacements } = (0, product_queries_1.getUpdateProductQuery)(productId, product);
    const res = yield db.query(query, replacements);
    db.end();
    return res.rows[0];
});
exports.updateProduct = updateProduct;
/**
 * Delete product
 */
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, storage_1.getDb)();
    db.connect();
    const { query, replacements } = (0, product_queries_1.getDeleteProductQuery)(id);
    const res = yield db.query(query, replacements);
    db.end();
    return res.rows[0];
});
exports.deleteProduct = deleteProduct;
