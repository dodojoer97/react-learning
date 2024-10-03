// src/routes/expenseRoutes.ts
import { Router } from "express";
import transactionController from "../controllers/TransactionController";

const router = Router();

router.post("/transactions", transactionController.addTransaction);
router.get("/transactions/:userId", transactionController.getTransactionsByUser);
router.get("/transactions/balance/:userId", transactionController.getBalance);

router.put("/transactions/:userId/:transactionId", transactionController.updateTransaction);
router.delete(
	"/transactions/:userId/:transactionId",
	transactionController.deleteTransactionForUser
);

export default router;
