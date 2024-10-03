import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import TransactionService from "@/services/TransactionService";
import { Transaction, CategoryType, OperationStatus, Category } from "@common";
import { RootState } from "./store";

import {
	TransactionWithCategory,
	TransactionCategoryAssigner,
} from "@/mappers/TransactionCategoryAssigner";

// Utils
import { getFirstDayOfMonth } from "@/utils/utils";
import moment from "moment";

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

const initialState: TransactionState = {
	transactions: [],
	selectedTransaction: null,
	draftTransaction: null,
	loading: false,
	error: null,
	selectedDates: defaultDates,
	balance: null,
};

// Initialize the TransactionService
const transactionService = new TransactionService();

const updateTransactionFields = (
	transaction: Transaction,
	updates: Partial<Transaction>
): Partial<Transaction> => ({
	id: updates.id ?? transaction.id,
	userId: updates.userId ?? transaction.userId,
	amount: updates.amount ?? transaction.amount,
	date: updates.date ?? transaction.date,
	categoryId: updates.categoryId ?? transaction.categoryId,
	type: updates.type ?? transaction.type,
	description: updates.description ?? transaction.description,
});

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
		console.log("Attempting to add transaction:", transaction);

		await transactionService.addTransaction({ ...transaction, userId });
		console.log("Transaction added successfully");
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

	try {
		// Determine whether to add a new transaction or edit an existing one
		const actionType = draftTransaction.id ? editTransaction : addTransaction;

		// Dispatch the appropriate action
		const resultAction = await dispatch(
			actionType({
				transaction: draftTransaction,
				userId: user.uid,
			})
		);

		// Check if the action was not fulfilled and throw an error to handle it in the rejected block
		if (resultAction.type.endsWith("rejected")) {
			throw new Error("Failed to process transaction");
		}
	} catch (error: any) {
		// Use a generic error message to simplify error handling
		return rejectWithValue("Error processing transaction: " + error.message);
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
						state.transactions[index] = state.draftTransaction; // Update the existing transaction
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
				state.loading = false;
				state.error = action.payload || "Failed to save draft transaction";
			})
			.addCase(deleteTransaction.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteTransaction.fulfilled, (state, action) => {
				const { transactionId } = action.meta.arg; // Get the transactionId from the fulfilled action meta
				state.transactions = state.transactions.filter(
					(transaction) => transaction.id !== transactionId
				); // Remove the deleted transaction from the state
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

// Mapped Transactions function
export const getMappedTransactions = (
	transactions: Transaction[],
	categories: Category[],
	type?: CategoryType
): TransactionWithCategory[] => {
	const mapper = new TransactionCategoryAssigner(categories);
	let mappedTransactions = mapper.assignCategoriesToTransactions(transactions);
	if (type) {
		mappedTransactions = mappedTransactions.filter(
			({ transaction }) => transaction.type === type
		);
	}
	return mappedTransactions;
};

// Default transaction template for initializing new transactions
export const defaultTransaction: Partial<Transaction> = {
	amount: 0,
	date: new Date(moment(new Date()).format("YYYY-MM-DD")).toISOString(),
	type: "expense",
	status: "completed",
};

// Export the actions and reducer
export const { selectTransaction, updateDraftTransaction, clearError, setSelectedDates } =
	transactionSlice.actions;
export default transactionSlice.reducer;
