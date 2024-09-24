// Interface
import { ITransactionService } from "./TransactionService.d";
import { MandatoryTransactionFields, Transaction } from "@common";

// Classes
import BaseService from "./BaseService";

// Utils
import { isError } from "@common";
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
		try {
			this.validateTransaction(transaction);
			await this.post<{ transaction: Transaction }>("transactions", { transaction });
		} catch (error) {
			if (isError(error)) {
				throw error;
			}
		}
	}

	/**
	 * Retrieves transactions for a specific user.
	 *
	 * @param {string} userId - The ID of the user whose transactions are to be retrieved.
	 * @returns {Promise<Transaction[]>} - A promise that resolves with an array of transactions.
	 */
	async getTransactionsByUser(userId: string): Promise<Partial<Transaction>[]> {
		const fetchedTransactions: Transaction[] = await this.get(`transactions/${userId}`);
		return this.buildTransactions(fetchedTransactions);
	}

	/**
	 * Edits an existing transaction using a PUT request.
	 *
	 * @param {string} transactionId - The ID of the transaction to be updated.
	 * @param {Transaction} updatedTransaction - The complete transaction data to replace the old one.
	 * @returns {Promise<void>} - A promise that resolves when the transaction is fully updated.
	 */
	async editTransaction(
		userId: string,
		transactionId: string,
		updatedTransaction: Transaction
	): Promise<void> {
		try {
			this.validateTransaction(updatedTransaction);
			await this.put<Transaction>(
				`transactions/${userId}/${transactionId}`,
				updatedTransaction
			);
		} catch (error) {
			if (isError(error)) {
				throw error;
			}
		}
	}

	private buildTransactions(fetchedTransactions: Transaction[]): Partial<Transaction>[] {
		const transactions: Partial<Transaction>[] = fetchedTransactions.map((transaction) => {
			return {
				id: transaction.id,
				userId: transaction.userId,
				amount: transaction.amount,
				date: transaction.date,
				categoryId: transaction.categoryId,
				type: transaction.type,
				description: transaction.description,
			};
		});
		return transactions;
	}

	/**
	 * Validates that all mandatory fields in a transaction are present and not null or undefined.
	 * Throws an error if any mandatory field is missing.
	 *
	 * @param {Transaction} transaction - The transaction object to validate.
	 * @throws {Error} Throws an error if any mandatory field is missing or invalid.
	 */
	private validateTransaction(transaction: Transaction): void {
		const mandatoryFields: MandatoryTransactionFields[] = [
			"userId",
			"date",
			"categoryId",
			"type",
		];
		// Loop over each mandatory field and check if it's present and not null
		for (const field of mandatoryFields) {
			if (!transaction[field]) {
				// This checks for both undefined and null
				throw new Error(`Field ${field} is mandatory and must not be null or undefined.`);
			}
		}
	}
}

export default TransactionService;
