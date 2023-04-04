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
exports.createOrderDetails = exports.createOrder = void 0;
const order_queries_1 = require("./order.queries");
const execute_query_1 = require("../execute-query");
/**
 * Create order
 */
const createOrder = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, replacements } = (0, order_queries_1.getCreateOrderQuery)(customerId);
    const res = yield (0, execute_query_1.executeQuery)(query, replacements);
    return res[0].id;
});
exports.createOrder = createOrder;
/**
 * Create order details
 */
const createOrderDetails = (orderId, products) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, replacements } = (0, order_queries_1.getCreateOrderDetailsQuery)(orderId, products);
    const res = yield (0, execute_query_1.executeQuery)(query, replacements);
    return res;
});
exports.createOrderDetails = createOrderDetails;
