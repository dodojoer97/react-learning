import { Category, Transaction } from "@common";

/**
 * Interface representing the result of assigning a category to a transaction.
 */
export interface TransactionWithCategory {
	transaction: Transaction;
	category: Category | undefined;
}

/**
 * Class responsible for assigning categories to transactions based on the transaction's categoryId.
 */
export class TransactionCategoryAssigner {
	private categories: Category[];

	/**
	 * Constructs a TransactionCategoryAssigner.
	 *
	 * @param {Category[]} categories - The list of available categories.
	 */
	constructor(categories: Category[]) {
		this.categories = categories;
	}

	/**
	 * Finds the category that matches the categoryId of the given transaction.
	 *
	 * @param {Transaction} transaction - The transaction for which to find the category.
	 * @returns {Category | undefined} The matching category, or undefined if no match is found.
	 * @private
	 */
	private findCategoryForTransaction(transaction: Transaction): Category | undefined {
		return this.categories.find((category) => category.id === transaction.categoryId);
	}

	/**
	 * Assigns categories to an array of transactions.
	 *
	 * @param {Transaction[]} transactions - The array of transactions to which categories should be assigned.
	 * @returns {Array<{ transaction: Transaction; category: Category | undefined }>}
	 *          An array of objects, each containing a transaction and its corresponding category (or undefined if no match is found).
	 */
	public assignCategoriesToTransactions(
		transactions: Transaction[]
	): Array<{ transaction: Transaction; category: Category | undefined }> {
		console.log("categories: ", this.categories);
		return transactions.map((transaction) => {
			return {
				transaction,
				category: this.findCategoryForTransaction(transaction),
			};
		});
	}
}
