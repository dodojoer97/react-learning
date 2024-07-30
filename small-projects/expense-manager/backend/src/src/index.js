"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const expenseRoutes_1 = __importDefault(require("./routes/expenseRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const cors_1 = __importDefault(require("cors"));
// CORS options
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Updated CORS origin
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use(authRoutes_1.default);
app.use(expenseRoutes_1.default);
app.use(categoryRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
