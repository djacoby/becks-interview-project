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
exports.executeQuery = void 0;
const pg_1 = require("pg");
const config_1 = require("../config");
/**
 * Get database connection instance
 */
const executeQuery = (query, replacements) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new pg_1.Client(config_1.config.db);
    db.connect();
    const result = yield db.query(query, replacements);
    db.end();
    return result.rows;
});
exports.executeQuery = executeQuery;
