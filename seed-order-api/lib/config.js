"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// TODO: use env vars
/**
 * Configuration object containing all environment variables
 */
exports.config = {
    api: {
        host: 'localhost',
        port: 8000,
    },
    db: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'pass',
        database: 'becks',
    },
};
