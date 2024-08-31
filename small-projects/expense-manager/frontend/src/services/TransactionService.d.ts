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

	/**
	 * Edits an existing transaction.
	 *
	 * @param {string} userId - The ID of the user who owns the transaction.
	 * @param {string} transactionId - The ID of the transaction to be updated.
	 * @param {Transaction} updatedTransaction - The complete transaction data to replace the old one.
	 * @returns {Promise<void>} - A promise that resolves when the transaction is fully updated.
	 */
	editTransaction(
		userId: string,
		transactionId: string,
		updatedTransaction: Transaction
	): Promise<void>;
}
