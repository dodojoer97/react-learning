// Interface
import { ITransactionService } from "./TransactionService.d";
import { Transaction } from "@common";

// Classes
import BaseService from "./BaseService";

/**
 * TransactionService class for handling transactions.
 * Extends BaseService to use common service functionalities.
 */
class TransactionService extends BaseService implements ITransactionService {
	/**
	 * TransactionService constructor.
	 * Sets up the base URL for the API.
	 */
	constructor() {
		const baseUrl = "http://localhost:3000";
		super(baseUrl);
	}

	/**
	 * Adds a new transaction.
	 *
	 * @param {Transaction} transaction - The transaction object to add.
	 * @returns {Promise<void>} - A promise that resolves when the transaction is added.
	 */
	async addTransaction(transaction: Transaction): Promise<void> {
		await this.post<Transaction>("transactions", transaction);
	}

	/**
	 * Retrieves transactions for a specific user.
	 *
	 * @param {string} userId - The ID of the user whose transactions are to be retrieved.
	 * @returns {Promise<Transaction[]>} - A promise that resolves with an array of transactions.
	 */
	async getTransactionsByUser(userId: string): Promise<Transaction[]> {
		return await this.get(`users/${userId}/transactions`);
	}
}

export default TransactionService;
