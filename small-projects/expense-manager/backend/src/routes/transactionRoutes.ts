// src/routes/expenseRoutes.ts
import { Router } from "express";
import transtactionController from "../controllers/TransactionController";

const router = Router();

router.post("/transactions", transtactionController.addTransaction);
router.get("/transactions/:userId", transtactionController.getTransactionsByUser);

export default router;
