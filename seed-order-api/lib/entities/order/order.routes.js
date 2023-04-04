"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
/**
 * Order router
 */
exports.router = (0, express_1.Router)();
/**
 * POST /order
 */
exports.router.post(`/`, order_controller_1.createOrderController);
