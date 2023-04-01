"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
console.log('Server starting');
if (require.main === module) {
    (0, app_1.listen)();
}
else {
    console.error('Cannot import this app');
}
