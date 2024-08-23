// Models
import { Transaction } from "@common";

/**
 * Interface for the Transaction Service.
 * Provides methods to manage transactions.
 */
export interface ITransactionService {
	/**
	 * Adds a new transaction.
	 *
	 * @param {Transaction} transaction - The transaction object to add.
	 * @returns {Promise<void>} - A promise that resolves when the transaction is added.
	 */
	addTransaction(transaction: Transaction): Promise<void>;

	/**
	 * Retrieves transactions for a specific user.
	 *
	 * @param {string} userId - The ID of the user whose transactions are to be retrieved.
	 * @returns {Promise<Transaction[]>} - A promise that resolves with an array of transactions.
	 */
	getTransactionsByUser(userId: string): Promise<Transaction[]>;
}
