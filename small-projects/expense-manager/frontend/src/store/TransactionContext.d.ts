// Types
import { ILoadingContext } from "@/types/common/index";
import { Transaction } from "@common";

export interface ITransactionContext extends ILoadingContext {
	selectedTransaction: Transaction | null;
	transactions: Transaction[];
	draftTransaction: Transaction | null;
	addTransaction(transaction: Transaction): Promise<void>; // Specify the parameter
	editTransaction(transaction: Transaction): Promise<void>; // Specify the parameter
	selectTransaction(transaction: Transaction): void;
	updateDraftTransaction(updates: Partial<Transaction>): void; // New method
	saveDraftTransaction(): Promise<void>; // New method
}
