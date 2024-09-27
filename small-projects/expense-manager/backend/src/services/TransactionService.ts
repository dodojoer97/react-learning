// src/services/TransactionService.ts
import TransactionRepository from "../repositories/TransactionRepository";
import { Transaction } from "@common";

class TransactionService {
	async createTransaction(transaction: Transaction): Promise<void> {
		await TransactionRepository.addTransaction({ ...transaction });
	}

	async fetchTransactionsByUser(
		userId: string,
		startDate?: string,
		endDate?: string
	): Promise<Transaction[]> {
		return TransactionRepository.getTransactionsByUser(userId, startDate, endDate);
	}
	// Update a transaction for a specific user
	async updateTransactionForUser(
		userId: string,
		transactionId: string,
		newData: Partial<Transaction>
	): Promise<void> {
		const snapshot = await TransactionRepository.getTransactionSnapshotForUser(
			transactionId,
			userId
		);
		if (snapshot.empty) {
			throw new Error(
				`Transaction with ID ${transactionId} does not exist for user ${userId}`
			);
		}
		await TransactionRepository.editTransactionForUser(snapshot, newData);
	}
}

export default new TransactionService();
