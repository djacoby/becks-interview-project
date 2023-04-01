"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require('cors');
const router_1 = require("./v0/router");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const corsOpts = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};
app.use('/', cors(corsOpts), router_1.router);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
