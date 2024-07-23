// src/routes/expenseRoutes.ts
import { Router } from "express";
import expenseController from "../controllers/ExpenseController";

const router = Router();

router.post("/expenses", expenseController.addExpense);
router.get("/expenses/:userId", expenseController.getExpensesByUser);

export default router;
