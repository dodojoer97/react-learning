// React
import { useState, useEffect, useContext } from "react";
import type { FC, PropsWithChildren, Context } from "react";
import { createContext } from "react";

// Interface
import { ITransactionContext } from "./TransactionContext.d";

// Models
import { Transaction } from "@common";

export const TransactionContext: Context<ITransactionContext> = createContext<ITransactionContext>({
	loading: false,
	selectedTransaction: null,
	transactions: [],
	addTransaction: async () => {},
	editTransaction: async () => {},
	selectTransaction: () => {},
});

const TransactionContextProvider: FC<PropsWithChildren> = ({ children }) => {
	// State
	const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
	const [transactions, setSetSelectedTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	// Methods
	const addTransaction = async (): Promise<void> => {};

	const editTransaction = async (): Promise<void> => {};

	const selectTransaction = (transaction: Transaction): void => {};

	const contextValue = {
		loading,
		selectedTransaction,
		transactions,
		addTransaction,
		editTransaction,
		selectTransaction,
	};

	return (
		<TransactionContext.Provider value={contextValue}>{children}</TransactionContext.Provider>
	);
};
