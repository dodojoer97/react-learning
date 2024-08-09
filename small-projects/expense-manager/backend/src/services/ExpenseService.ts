// src/services/ExpenseService.ts
import expenseRepository from "../repositories/ExpenseRepository";
import { Expense } from "@common";

class ExpenseService {
	async createExpense(expense: Expense): Promise<void> {
		await expenseRepository.addExpense(expense);
	}

	async fetchExpensesByUser(userId: string): Promise<Expense[]> {
		return await expenseRepository.getExpensesByUser(userId);
	}
}

export default new ExpenseService();
