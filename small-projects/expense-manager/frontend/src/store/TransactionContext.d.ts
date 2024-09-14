// Types
import { ILoadingContext } from "@/types/common/index";
import { Transaction, OperationStatus, CategoryType } from "@common";
import { TransactionWithCategory } from "@/mappers/TransactionCategoryAssigner";

export interface ITransactionContext extends ILoadingContext {
	selectedTransaction: Transaction | null;
	transactions: Transaction[];
	draftTransaction: Transaction | null;
	error: string | null;
	addTransaction(transaction: Transaction): Promise<OperationStatus>; // Specify the parameter
	editTransaction(transaction: Transaction): Promise<OperationStatus>; // Specify the parameter
	selectTransaction(transaction: Transaction): void;
	updateDraftTransaction(updates: Partial<Transaction>): void; // New method
	saveDraftTransaction(): Promise<OperationStatus>;
	fetchTransactions(): Promise<void>;
	getMappedTransactions(categories: categories[], type?: CategoryType): TransactionWithCategory[];
}
