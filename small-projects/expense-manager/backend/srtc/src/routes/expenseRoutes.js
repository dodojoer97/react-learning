"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/expenseRoutes.ts
const express_1 = require("express");
const ExpenseController_1 = __importDefault(require("../controllers/ExpenseController"));
const router = (0, express_1.Router)();
router.post("/expenses", ExpenseController_1.default.addExpense);
router.get("/expenses/:userId", ExpenseController_1.default.getExpensesByUser);
exports.default = router;
