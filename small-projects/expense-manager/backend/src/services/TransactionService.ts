// src/services/TransactionService.ts
import TransactionRepository from "../repositories/TransactionRepository";
import { Transaction } from "@common";

class TransactionService {
	async createTransaction(transaction: Transaction): Promise<void> {
		await TransactionRepository.addTransaction(transaction);
	}

	async fetchTransactionsByUser(userId: string): Promise<Transaction[]> {
		return await TransactionRepository.getTransactionsByUser(userId);
	}
}

export default new TransactionService();
