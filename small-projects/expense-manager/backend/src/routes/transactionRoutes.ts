// src/routes/expenseRoutes.ts
import { Router } from "express";
import transactionController from "../controllers/TransactionController";

const router = Router();

router.post("/transactions", transactionController.addTransaction);
router.get("/transactions/:userId", transactionController.getTransactionsByUser);
router.put("/transactions/:userId/:transactionId", transactionController.updateTransaction); // Add this line
router.delete(
	"/transactions/:userId/:transactionId",
	transactionController.deleteTransactionForUser
); // Add this line

export default router;
