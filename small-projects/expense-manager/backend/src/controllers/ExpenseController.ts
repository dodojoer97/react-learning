// src/controllers/ExpenseController.ts
import { Request, Response } from "express";
import expenseService from "../services/ExpenseService";
import { Expense } from "@common";

class ExpenseController {
	async addExpense(req: Request, res: Response): Promise<void> {
		try {
			const expense: Expense = req.body;
			await expenseService.createExpense(expense);
			res.status(201).send(expense);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}

	async getExpensesByUser(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.params;
			const expenses = await expenseService.fetchExpensesByUser(userId);
			res.status(200).send(expenses);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}
}

export default new ExpenseController();
