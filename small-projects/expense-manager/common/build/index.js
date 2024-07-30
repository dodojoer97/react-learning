"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFirebaseError = exports.isError = exports.Logger = void 0;
// Classes
var Logger_1 = require("./classes/Logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return Logger_1.Logger; } });
// Utils
var isError_1 = require("./utils/isError");
Object.defineProperty(exports, "isError", { enumerable: true, get: function () { return isError_1.isError; } });
Object.defineProperty(exports, "isFirebaseError", { enumerable: true, get: function () { return isError_1.isFirebaseError; } });
//# sourceMappingURL=index.js.map