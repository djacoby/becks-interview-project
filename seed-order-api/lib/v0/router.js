"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
/**
 * Base router
 */
exports.router = (0, express_1.Router)();
exports.router.get('/hello', (req, res) => {
    res.send({ res: 'Hello! ' });
});
