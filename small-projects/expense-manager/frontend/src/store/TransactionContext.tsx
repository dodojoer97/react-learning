// React
import { useState, useContext, useCallback } from "react";
import type { FC, PropsWithChildren, Context } from "react";
import { createContext } from "react";

// Interface
import { ITransactionContext } from "./TransactionContext.d";

// Models
import { Transaction, CategoryType, isError, OperationStatus, Category } from "@common";

// Store
import { AuthContext } from "./AuthContext";
import { SettingsContext } from "./SettingsContext";

// Service
import TransactionService from "@/services/TransactionService";

// Mappers
import {
	TransactionWithCategory,
	TransactionCategoryAssigner,
} from "@/mappers/TransactionCategoryAssigner";

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
	draftTransaction: null, // Default state for draft transaction,
	error: null,
	addTransaction: async () => new OperationStatus(),
	editTransaction: async () => new OperationStatus(),
	selectTransaction: () => {},
	updateDraftTransaction: () => {}, // Default for updating draft transaction
	saveDraftTransaction: async () => new OperationStatus(), // Default for saving draft transaction
	fetchTransactions: async () => {},
	getMappedTransactions: () => [],
});

// Provider component for the Transaction Context
const TransactionContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const transactionService = new TransactionService();

	// Store
	const { user } = useContext(AuthContext);
	const { categories } = useContext(SettingsContext);

	// State hooks for managing transactions and loading status
	const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [draftTransaction, setDraftTransaction] = useState<Transaction | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Method to add a new transaction to the transactions list
	const addTransaction = useCallback(
		async (transaction: Transaction): Promise<OperationStatus> => {
			const operationStatus = new OperationStatus();
			setError(null);
			if (!user?.uid) throw new Error("User id is mandatory in addTransaction");
			try {
				setLoading(true);
				await transactionService.addTransaction({ ...transaction, userId: user.uid });
				setTransactions((prev) => [...prev, transaction]);
				operationStatus.ok = true;
			} catch (error) {
				console.error("Failed to add transaction:", error);
				if (isError(error)) {
					setError(error.message || "");
				}
				operationStatus.ok = false;
			} finally {
				setLoading(false);
			}
			return operationStatus;
		},
		[user?.uid, transactionService]
	);

	// Method to update an existing transaction in the transactions list
	const editTransaction = useCallback(
		async (updatedTransaction: Transaction): Promise<OperationStatus> => {
			const operationStatus = new OperationStatus();
			if (!user?.uid) throw new Error("User id is mandatory in editTransaction");
			try {
				setLoading(true);
				await transactionService.editTransaction(
					user.uid,
					updatedTransaction.id,
					updatedTransaction
				);
				setTransactions((prev) =>
					prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
				);
				operationStatus.ok = true;
			} catch (error) {
				console.error("Failed to update transaction:", error);
				if (isError(error)) {
					setError(error.message || "");
				}
				operationStatus.ok = false;
			} finally {
				setLoading(false);
			}
			return operationStatus;
		},
		[user?.uid, transactionService]
	);

	// Method to select a transaction and initialize the draft for editing
	const selectTransaction = useCallback((transaction: Transaction): void => {
		setSelectedTransaction(transaction);
		setDraftTransaction({ ...transaction });
	}, []);

	// Method to update the draft transaction based on user input
	const updateDraftTransaction = useCallback((updates: Partial<Transaction>): void => {
		setDraftTransaction((prev) => {
			if (!prev) {
				// If there's no draft, initialize with default values and apply updates
				return { ...defaultTransaction, ...updates };
			}
			// Merge updates into the current draft, ensuring no values become undefined
			// TODO, check if the type of category changed, if so set the category id to null
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
	}, []);

	// Method to save the draft transaction to the transactions list
	const saveDraftTransaction = useCallback(async (): Promise<OperationStatus> => {
		if (!draftTransaction) return new OperationStatus();
		const status: OperationStatus = draftTransaction.id
			? await editTransaction(draftTransaction)
			: await addTransaction(draftTransaction);
		return status;
	}, [draftTransaction, addTransaction, editTransaction]);

	// Method to fetch transactions
	const fetchTransactions = useCallback(async (): Promise<void> => {
		setError(null);
		if (!user?.uid) throw new Error("User id is mandatory in fetchTransactions");
		try {
			setLoading(true);
			const fetchedTransactions: Transaction[] =
				await transactionService.getTransactionsByUser(user.uid);
			setTransactions(fetchedTransactions);
		} catch (error) {
			console.error("Failed to fetch transactions:", error);
			if (isError(error)) {
				setError(error.message || "");
			}
		} finally {
			setLoading(false);
		}
	}, [user?.uid, transactionService]);

	// Method to get mapped transactions
	const getMappedTransactions = useCallback(
		(type?: CategoryType): TransactionWithCategory[] => {
			const mapper = new TransactionCategoryAssigner(categories);
			try {
				let mappedTransactions = mapper.assignCategoriesToTransactions(transactions);
				if (type) {
					mappedTransactions = mappedTransactions.filter(
						({ transaction }) => transaction.type === type
					);
				}
				return mappedTransactions;
			} catch (error) {
				console.error("Failed to get mapped transactions:", error);
				if (isError(error)) {
					throw new Error(
						error.message || "Something went wrong in getMappedTransactions"
					);
				}
				return [];
			}
		},
		[transactions]
	);
	// The context value that will be provided to the consuming components
	const contextValue = {
		loading,
		selectedTransaction,
		transactions,
		draftTransaction,
		error,
		addTransaction,
		editTransaction,
		selectTransaction,
		updateDraftTransaction,
		saveDraftTransaction,
		fetchTransactions,
		getMappedTransactions,
	};

	return (
		<TransactionContext.Provider value={contextValue}>{children}</TransactionContext.Provider>
	);
};

export default TransactionContextProvider;
