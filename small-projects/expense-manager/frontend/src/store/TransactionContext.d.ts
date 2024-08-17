// Types
import { ILoadingContext } from "@/types/common/index";

// Model
import { Transaction } from "@/common";

export interface ITransactionContext extends ILoadingContext {
	selectedTransaction: Transaction | null;
	transactions: Transaction[];
	addTransaction(): Promise<void>;
	editTransaction(): Promise<void>;
	selectTransaction(transaction: Transaction): void;
}
