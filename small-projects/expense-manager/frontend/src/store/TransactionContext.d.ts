// Types
import { ILoadingContext } from "@/types/common/index";

// Model
import { Transaction } from "@/common";

export interface ITransactionContext extends ILoadingContext {
	transactions: Transaction[];
}
