import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import TransactionService from "@/services/TransactionService";
import { Transaction, CategoryType, OperationStatus, Category } from "@common";
import { RootState } from "./store";
import i18n from "@/i18n"; // Import the i18n instance

import {
	TransactionWithCategory,
	TransactionCategoryAssigner,
} from "@/mappers/TransactionCategoryAssigner";

// Utils
import { getFirstDayOfMonth } from "@/utils/utils";
import moment from "moment";
import { IErrorMessages } from "@/locales/translation";
import { errorTranslations } from "@/locales/en/translations";
import { useTranslation } from "react-i18next";

// Define the state interface
export interface TransactionState {
	transactions: Transaction[];
	selectedTransaction: Transaction | null;
	draftTransaction: Transaction | null;
	loading: boolean;
	error: string | null;
	selectedDates: string[] | null;
	balance: number | null;
}

const defaultDates = [
	moment(getFirstDayOfMonth()).format("YYYY-MM-DD"),
	moment(new Date()).format("YYYY-MM-DD"),
];

// Default transaction template for initializing new transactions
export const defaultTransaction: Partial<Transaction> = {
	amount: 0,
	date: new Date(moment(new Date()).format("YYYY-MM-DD")).toISOString(),
	type: "expense",
	status: "completed",
};

// Mapped Transactions function
export const getMappedTransactions = (
	transactions: Transaction[],
	categories: Category[],
	type?: CategoryType,
	status?: Transaction["status"]
): TransactionWithCategory[] => {
	const mapper = new TransactionCategoryAssigner(categories);
	let mappedTransactions = mapper.assignCategoriesToTransactions(transactions);

	if (type) {
		mappedTransactions = mappedTransactions.filter(
			({ transaction }) => transaction.type === type
		);
	}

	if (status) {
		mappedTransactions = mappedTransactions.filter(
			({ transaction }) => transaction.status === status
		);
	}

	return mappedTransactions;
};

const initialState: TransactionState = {
	transactions: [defaultTransaction, defaultTransaction, defaultTransaction],
	selectedTransaction: null,
	draftTransaction: null,
	loading: true,
	error: null,
	selectedDates: defaultDates,
	balance: null,
};

/**
 * Optimistically updates the balance based on the transaction type and amount.
 * This function calculates the new balance for "income" or "expense" transactions.
 *
 * @param {number | null} balance - The current balance. If null, the balance will be treated as 0.
 * @param {string} transactionType - The type of the transaction. It can be either "income" or "expense".
 * @param {number} amount - The amount of the transaction to adjust the balance.
 * @returns {number} - The updated balance after applying the transaction.
 */
const updateOptimisticBalance = (
	status: Transaction["status"],
	balance: number | null,
	transactionType: string,
	amount: number
): number => {
	if (status === "planned") return balance as number;

	if (transactionType === "income" && transactionType) {
		return (balance || 0) + amount;
	} else if (transactionType === "expense") {
		return (balance || 0) - amount;
	}
	return balance || 0;
};

// Initialize the TransactionService
const transactionService = new TransactionService();

const updateTransactionFields = (
	transaction: Transaction,
	updates: Partial<Transaction>
): Partial<Transaction> => {
	// get the date, either from the transaction or when updating from the updates obj
	const comparedDate = updates.date
		? new Date(updates.date as string)
		: new Date(transaction.date as string);

	// Create a clone of the updates to not ipact the provided object
	const updatesClone = { ...updates };

	// If the selected date is in the future is a planned payment
	if (comparedDate > new Date()) {
		updatesClone.status = "planned";
	} else {
		updatesClone.status = "completed";
	}

	const current: Partial<Transaction> = {
		id: updatesClone.id ?? transaction.id,
		userId: updatesClone.userId ?? transaction.userId,
		amount: updatesClone.amount ?? transaction.amount,
		date: updatesClone.date ?? transaction.date,
		categoryId: updatesClone.categoryId ?? transaction.categoryId,
		type: updatesClone.type ?? transaction.type,
		description: updatesClone.description ?? transaction.description,
		status: updatesClone.status ?? transaction.status,
		recurring: updatesClone.recurring || transaction.recurring,
	};

	return current;
};

// Thunks for async operations

export const fetchTransactions = createAsyncThunk<
	Partial<Transaction>[],
	{ userId: string; startDate?: string; endDate?: string; completedOnly?: boolean },
	{ rejectValue: string }
>(
	"transactions/fetchTransactions",
	async ({ userId, startDate, endDate, completedOnly }, { rejectWithValue }) => {
		try {
			const transactions = await transactionService.getTransactionsByUser(
				userId,
				startDate,
				endDate,
				completedOnly
			);
			return transactions;
		} catch (error: any) {
			return rejectWithValue(error.message || "Failed to fetch transactions");
		}
	}
);

export const addTransaction = createAsyncThunk<
	void,
	{ transaction: Transaction; userId: string },
	{ rejectValue: string }
>("transactions/addTransaction", async ({ transaction, userId }, { rejectWithValue }) => {
	try {
		await transactionService.addTransaction({ ...transaction, userId });
	} catch (error: any) {
		console.error("Error adding transaction:", error);

		return rejectWithValue(error.message || "Failed to add transaction");
	}
});

export const editTransaction = createAsyncThunk<
	void,
	{ transaction: Transaction; userId: string },
	{ rejectValue: string }
>("transactions/editTransaction", async ({ transaction, userId }, { rejectWithValue }) => {
	try {
		await transactionService.editTransaction(userId, transaction.id, transaction);
	} catch (error: any) {
		return rejectWithValue(error.message || "Failed to update transaction");
	}
});

export const deleteTransaction = createAsyncThunk<
	void,
	{ userId: string; transactionId: string },
	{ rejectValue: string }
>("transactions/deleteTransaction", async ({ transactionId, userId }, { rejectWithValue }) => {
	try {
		await transactionService.deleteTransaction(userId, transactionId);
	} catch (error: any) {
		return rejectWithValue(error.message || "Failed to update transaction");
	}
});

/**
 * Validates a draft transaction and returns an error message if validation fails.
 * If validation passes, it returns null.
 *
 * @param draftTransaction - The transaction object to validate.
 * @returns The validation error message or null if valid.
 */
const validateTransaction = (draftTransaction: Partial<Transaction>): string | null => {
	const { amount, date, categoryId } = draftTransaction;

	// Validate amount
	if (amount === undefined || amount <= 0) {
		return i18n.t("invalidAmount", { ns: "errors" }); // Use i18n with namespace option
	}

	// Validate date
	if (!date) {
		return i18n.t("missingDate", { ns: "errors" }); // Use i18n with namespace option
	}

	// Validate categoryId
	if (!categoryId) {
		return i18n.t("missingCategory", { ns: "errors" }); // Use i18n with namespace option
	}

	// If all checks pass, return null
	return null;
};

export const saveDraftTransaction = createAsyncThunk<
	void,
	void,
	{ state: RootState; rejectValue: string }
>("transaction/saveDraftTransaction", async (_, { getState, dispatch, rejectWithValue }) => {
	const { draftTransaction } = getState().transaction;
	const { user } = getState().auth;

	if (!draftTransaction || !user?.uid) {
		return rejectWithValue("No draft transaction or user ID available");
	}

	const validationError = validateTransaction(draftTransaction);

	console.log("validationError:", validationError);
	if (validationError) {
		return rejectWithValue(validationError); // Reject with the validation error
	}

	try {
		// Determine whether to add a new transaction or edit an existing one
		const actionType = draftTransaction.id ? editTransaction : addTransaction;

		// // Dispatch the appropriate action
		// const resultAction = await dispatch(
		// 	actionType({
		// 		transaction: draftTransaction,
		// 		userId: user.uid,
		// 	})
		// );

		// // Check if the action was not fulfilled and throw an error to handle it in the rejected block
		// if (resultAction.type.endsWith("rejected")) {
		// 	throw new Error("Failed to process transaction");
		// }
	} catch (error: any) {
		console.log("error.message: ", error.message);
		// Use a generic error message to simplify error handling
		return rejectWithValue(error.message || "processing transaction");
	}
});

// Get user balance
export const getBalance = createAsyncThunk<
	number,
	{ userId: string; startDate?: string; endDate?: string },
	{ rejectValue: string }
>("transaction/getBalance", async ({ userId, startDate, endDate }, { rejectWithValue }) => {
	try {
		// Get the balance
		const balance: number = await transactionService.getBalance(userId, startDate, endDate);
		return balance;
	} catch (error: any) {
		// Use a generic error message to simplify error handling
		return rejectWithValue("Error getting balance: " + error.message);
	}
});

// Create the slice
const transactionSlice = createSlice({
	name: "transactions",
	initialState,
	reducers: {
		selectTransaction: (state, action: PayloadAction<Transaction | null>) => {
			state.selectedTransaction = action.payload;
			state.draftTransaction = action.payload ? { ...action.payload } : null;
		},
		updateDraftTransaction: (state, action: PayloadAction<Partial<Transaction>>) => {
			state.error = ""; // clear the error when something updates
			if (!state.draftTransaction) {
				state.draftTransaction = updateTransactionFields(
					initialState.draftTransaction!,
					action.payload
				);
			} else {
				state.draftTransaction = updateTransactionFields(
					state.draftTransaction,
					action.payload
				);
			}
		},
		setSelectedDates: (state, action: PayloadAction<string[] | null>) => {
			state.selectedDates = action.payload; // Set selected dates
		},
		clearSelectedDates: (state) => {
			state.selectedDates = null; // Clear selected dates
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch transactions lifecycle
			.addCase(fetchTransactions.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
				state.transactions = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchTransactions.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch transactions";
			})
			// Add transaction lifecycle
			.addCase(addTransaction.pending, (state) => {
				state.loading = true;
			})
			.addCase(addTransaction.fulfilled, (state) => {
				if (state.draftTransaction) {
					state.transactions.push(state.draftTransaction); // Add the draft to transactions
					console.log("state.draftTransaction: ", state.draftTransaction.status);
					// Edit the balance
					state.balance = updateOptimisticBalance(
						state.draftTransaction.status,
						state.balance,
						state.draftTransaction.type,
						state.draftTransaction.amount
					);
				}

				state.loading = false;
				state.draftTransaction = null; // Clear the draft after saving
				state.error = null;
			})
			.addCase(addTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to add transaction";
			})
			// Edit transaction lifecycle
			.addCase(editTransaction.pending, (state) => {
				state.loading = true;
			})
			.addCase(editTransaction.fulfilled, (state) => {
				if (state.draftTransaction) {
					const index = state.transactions.findIndex(
						(transaction) => transaction.id === state.draftTransaction!.id
					);

					if (index !== -1) {
						const existingTransaction = state.transactions[index];

						// Calculate the difference between the old and new amounts
						const amountDifference =
							state.draftTransaction.amount - existingTransaction.amount;

						// Optimistically update the balance based on the amount difference
						state.balance = updateOptimisticBalance(
							state.draftTransaction.status,
							state.balance,
							state.draftTransaction.type,
							amountDifference
						);

						// Update the existing transaction with the draft
						state.transactions[index] = state.draftTransaction;
					}
				}

				state.loading = false;
				state.draftTransaction = null; // Clear the draft after saving
				state.error = null;
			})
			.addCase(editTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to edit transaction";
			})
			// Save draft transaction lifecycle
			.addCase(saveDraftTransaction.pending, (state) => {
				state.loading = true;
			})
			.addCase(saveDraftTransaction.fulfilled, (state) => {
				state.loading = false;
				state.draftTransaction = null; // Clear draft after save
				state.error = null;
			})
			.addCase(saveDraftTransaction.rejected, (state, action) => {
				console.log("action: ", action.payload);
				state.loading = false;
				state.error = action.payload || "Failed to save draft transaction";
			})
			.addCase(deleteTransaction.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteTransaction.fulfilled, (state, action) => {
				const { transactionId } = action.meta.arg; // Get the transactionId from the fulfilled action meta

				// Find the transaction to delete
				const transactionToDelete = state.transactions.find(
					(transaction) => transaction.id === transactionId
				);

				if (transactionToDelete) {
					console.log("transactionToDelete.status: ", transactionToDelete.status);
					// Optimistically update the balance by subtracting the transaction amount
					state.balance = updateOptimisticBalance(
						transactionToDelete.status,
						state.balance,
						transactionToDelete.type,
						-transactionToDelete.amount
					);

					// Remove the deleted transaction from the state
					state.transactions = state.transactions.filter(
						(transaction) => transaction.id !== transactionId
					);
				}

				state.loading = false;
				state.draftTransaction = null; // Clear draft after delete
				state.error = null;
			})
			.addCase(deleteTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to delete transaction";
			})
			.addCase(getBalance.pending, (state) => {
				state.loading = true;
			})
			.addCase(getBalance.fulfilled, (state, action: PayloadAction<number>) => {
				state.balance = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(getBalance.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to get balance";
			});
	},
});

// Export the actions and reducer
export const { selectTransaction, updateDraftTransaction, clearError, setSelectedDates } =
	transactionSlice.actions;
export default transactionSlice.reducer;
