// src/repositories/ExpenseRepository.ts
import { db } from "../config/firebase";
import { Expense } from "../models/Expense";

class ExpenseRepository {
	private expensesCollection = db.collection("expenses");

	async addExpense(expense: Expense): Promise<void> {
		const expenseDoc = this.expensesCollection.doc(expense.id);
		await expenseDoc.set(expense);
	}

	async getExpensesByUser(userId: string): Promise<Expense[]> {
		const snapshot = await this.expensesCollection.where("userId", "==", userId).get();
		return snapshot.docs.map((doc) => doc.data() as Expense);
	}
}

export default new ExpenseRepository();
