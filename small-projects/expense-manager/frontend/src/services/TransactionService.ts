// Interface
import { ITransactionService } from "./TransactionService.d";
import { MandatoryTransactionFields, Transaction } from "@common";

// Classes
import BaseService from "./BaseService";

// Utils
import { isError } from "@common";

// DTO
import { GetBalanceDTO } from "@/DTO/response/GetBalance";

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
			await this.post<{ transaction: Transaction }>(
				"transactions",
				{ transaction },
				{ auth: true }
			);
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
	async getTransactionsByUser(
		userId: string,
		startDate?: string,
		endDate?: string,
		completedOnly?: boolean
	): Promise<Partial<Transaction>[]> {
		const params: Record<string, string | boolean> = {};

		if (startDate && endDate) {
			params.startDate = startDate;
			params.endDate = endDate;
		}

		if (completedOnly) {
			params.completedOnly = completedOnly;
		}

		const fetchedTransactions: Transaction[] = await this.get(`transactions/${userId}`, {
			params,
			auth: true,
		});
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
				updatedTransaction,
				{ auth: true }
			);
		} catch (error) {
			if (isError(error)) {
				throw error;
			}
		}
	}

	/**
	 * deletes an existing transaction using a DELETE request.
	 *
	 * @param {string} userId - The user id
	 * @param {string} transactionId - The ID of the transaction to be deleted.
	 * @returns {Promise<void>} - A promise that resolves when the transaction is fully deleted.
	 */
	async deleteTransaction(userId: string, transactionId: string): Promise<void> {
		try {
			await this.delete(`transactions/${userId}/${transactionId}`, { auth: true });
		} catch (error) {
			if (isError(error)) {
				throw error;
			}
		}
	}

	async getBalance(userId: string, startDate?: string, endDate?: string): Promise<number> {
		try {
			const params: Record<string, string> = {};

			if (startDate && endDate) {
				params.startDate = startDate;
				params.endDate = endDate;
			}

			const data: GetBalanceDTO = await this.get(`transactions/balance/${userId}`, {
				params,
				auth: true,
			});

			return data.balance;
		} catch (error) {
			if (isError(error)) {
				throw error;
			}

			throw error;
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
				status: transaction.status,
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
