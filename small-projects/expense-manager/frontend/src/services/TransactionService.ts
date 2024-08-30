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
	async getTransactionsByUser(userId: string): Promise<Transaction[]> {
		const fetchedTransactions: Transaction[] = await this.get(`transactions/${userId}`);
		return this.buildTransactions(fetchedTransactions);
	}

	private buildTransactions(fetchedTransactions: Transaction[]): Transaction[] {
		const categories: Transaction[] = fetchedTransactions.map(
			(transaction) =>
				new Transaction(
					transaction.id,
					transaction.userId,
					transaction.amount,
					new Date(transaction.date),
					transaction.categoryId,
					transaction.type,
					transaction.description
				)
		);
		return categories;
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
