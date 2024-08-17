// React
import { useState, useEffect, useContext } from "react";
import type { FC, PropsWithChildren, Context } from "react";
import { createContext } from "react";

// Interface
import { ITransactionContext } from "./TransactionContext.d";

// Models
import { Transaction, CategoryType } from "@common";

// Default transaction template for initializing new transactions
export const defaultTransaction: Transaction = {
	id: "",
	userId: "",
	amount: 0,
	date: new Date(),
	categoryId: "",
	type: "expense" as CategoryType,
	description: "",
};

// Creating the context with a default value, including new methods
export const TransactionContext: Context<ITransactionContext> = createContext<ITransactionContext>({
	loading: false,
	selectedTransaction: null,
	transactions: [],
	draftTransaction: null, // Default state for draft transaction
	addTransaction: async () => {},
	editTransaction: async () => {},
	selectTransaction: () => {},
	updateDraftTransaction: () => {}, // Default for updating draft transaction
	saveDraftTransaction: async () => {}, // Default for saving draft transaction
});

// Provider component for the Transaction Context
const TransactionContextProvider: FC<PropsWithChildren> = ({ children }) => {
	// State hooks for managing transactions and loading status
	const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [draftTransaction, setDraftTransaction] = useState<Transaction | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	// Method to add a new transaction to the transactions list
	const addTransaction = async (transaction: Transaction): Promise<void> => {
		setTransactions((prev) => [...prev, transaction]);
	};

	// Method to update an existing transaction in the transactions list
	const editTransaction = async (transaction: Transaction): Promise<void> => {
		setTransactions((prev) => prev.map((t) => (t.id === transaction.id ? transaction : t)));
	};

	// Method to select a transaction and initialize the draft for editing
	const selectTransaction = (transaction: Transaction): void => {
		setSelectedTransaction(transaction);
		setDraftTransaction({ ...transaction }); // Initialize draft with selected transaction
	};

	// Method to update the draft transaction based on user input
	const updateDraftTransaction = (updates: Partial<Transaction>): void => {
		setDraftTransaction((prev) => {
			if (!prev) {
				// If there's no draft, initialize with default values and apply updates
				return { ...defaultTransaction, ...updates };
			}
			// Merge updates into the current draft, ensuring no values become undefined
			return {
				id: updates.id ?? prev.id,
				userId: updates.userId ?? prev.userId,
				amount: updates.amount ?? prev.amount,
				date: updates.date ?? prev.date,
				categoryId: updates.categoryId ?? prev.categoryId,
				type: updates.type ?? prev.type,
				description: updates.description ?? prev.description,
			};
		});
	};

	// Method to save the draft transaction to the transactions list
	const saveDraftTransaction = async (): Promise<void> => {
		if (draftTransaction) {
			// Check if the draft has an id to determine if it's an edit or a new addition
			draftTransaction.id
				? await editTransaction(draftTransaction)
				: await addTransaction(draftTransaction);
		}
	};

	// The context value that will be provided to the consuming components
	const contextValue = {
		loading,
		selectedTransaction,
		transactions,
		draftTransaction,
		addTransaction,
		editTransaction,
		selectTransaction,
		updateDraftTransaction,
		saveDraftTransaction,
	};

	return (
		<TransactionContext.Provider value={contextValue}>{children}</TransactionContext.Provider>
	);
};

export default TransactionContextProvider;
