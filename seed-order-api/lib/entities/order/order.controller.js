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
exports.createOrderController = void 0;
const order_service_1 = require("./order.service");
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    const orderId = yield (0, order_service_1.createOrder)(order.customerId);
    if (!orderId) {
        res.status(500).json({ message: 'Internal server error' });
    }
    const products = yield (0, order_service_1.createOrderDetails)(orderId, order.products);
    if (!products) {
        res.status(500).json({ message: 'Internal server error' });
    }
    const newOrder = {
        products,
        id: orderId,
        customerId: order.customerId,
        created: Date.now().toString(),
    };
    res.status(200).json(newOrder);
});
exports.createOrderController = createOrderController;
