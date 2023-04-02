"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const product_routes_1 = require("./entities/product/product.routes");
const health_routes_1 = require("./entities/health.routes");
const constants_1 = require("./constants");
/**
 * Base router
 */
exports.router = (0, express_1.Router)();
exports.router.use(constants_1.API_ROUTES.health, health_routes_1.router);
exports.router.use(constants_1.API_ROUTES.product, product_routes_1.router);
