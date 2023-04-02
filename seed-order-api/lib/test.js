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
const execute_query_1 = require("./entities/execute-query");
const product_service_1 = require("./entities/product/product.service");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = (0, execute_query_1.getDb)();
        console.log(db);
        const res = yield (0, product_service_1.getAllProducts)();
        console.log(res);
    });
}
run();