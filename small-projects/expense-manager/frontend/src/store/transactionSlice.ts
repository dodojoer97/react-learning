import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import TransactionService from "@/services/TransactionService";
import { Transaction, CategoryType, OperationStatus, Category } from "@common";
import {
	TransactionWithCategory,
	TransactionCategoryAssigner,
} from "@/mappers/TransactionCategoryAssigner";
import User from "@/models/User";

// Define the state interface
export interface TransactionState {
	transactions: Transaction[];
	selectedTransaction: Transaction | null;
	draftTransaction: Transaction | null;
	loading: boolean;
	error: string | null;
}

const initialState: TransactionState = {
	transactions: [],
	selectedTransaction: null,
	draftTransaction: null,
	loading: false,
	error: null,
};

// Initialize the TransactionService
const transactionService = new TransactionService();

const updateTransactionFields = (
	transaction: Transaction,
	updates: Partial<Transaction>
): Transaction => ({
	id: updates.id ?? transaction.id,
	userId: updates.userId ?? transaction.userId, // Ensure it's a string
	amount: updates.amount ?? transaction.amount,
	date: updates.date ?? transaction.date,
	categoryId: updates.categoryId ?? transaction.categoryId,
	type: updates.type ?? transaction.type,
	description: updates.description ?? transaction.description,
});

// Thunks for async operations

export const fetchTransactions = createAsyncThunk<Transaction[], string, { rejectValue: string }>(
	"transactions/fetchTransactions",
	async (userId: string, { rejectWithValue }) => {
		try {
			const transactions = await transactionService.getTransactionsByUser(userId);
			return transactions;
		} catch (error: any) {
			return rejectWithValue(error.message || "Failed to fetch transactions");
		}
	}
);

export const addTransaction = createAsyncThunk<
	OperationStatus,
	{ transaction: Transaction; userId: string },
	{ rejectValue: string }
>("transactions/addTransaction", async ({ transaction, userId }, { rejectWithValue }) => {
	try {
		await transactionService.addTransaction({ ...transaction, userId });
		return { ok: true };
	} catch (error: any) {
		return rejectWithValue(error.message || "Failed to add transaction");
	}
});

export const editTransaction = createAsyncThunk<
	OperationStatus,
	{ transaction: Transaction; userId: string },
	{ rejectValue: string }
>("transactions/editTransaction", async ({ transaction, userId }, { rejectWithValue }) => {
	try {
		await transactionService.editTransaction(userId, transaction.id, transaction);
		return { ok: true };
	} catch (error: any) {
		return rejectWithValue(error.message || "Failed to update transaction");
	}
});

export const saveDraftTransaction = createAsyncThunk<
	OperationStatus,
	void,
	{ state: { transaction: TransactionState; auth: { user: User } }; rejectValue: string }
>("transactions/saveDraftTransaction", async (_, { getState, rejectWithValue }) => {
	const { draftTransaction } = getState().transaction;
	const { user } = getState().auth;
	if (!draftTransaction || !user?.uid) {
		return rejectWithValue("No draft or user ID available");
	}

	const status: OperationStatus = draftTransaction.id
		? await transactionService.editTransaction(user.uid, draftTransaction.id, draftTransaction)
		: await transactionService.addTransaction({ ...draftTransaction, userId: user.uid });

	return status;
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
			.addCase(addTransaction.fulfilled, (state, action: PayloadAction<OperationStatus>) => {
				state.loading = false;
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
			.addCase(editTransaction.fulfilled, (state, action: PayloadAction<OperationStatus>) => {
				state.loading = false;
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
			.addCase(
				saveDraftTransaction.fulfilled,
				(state, action: PayloadAction<OperationStatus>) => {
					state.loading = false;
					state.error = null;
				}
			)
			.addCase(saveDraftTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to save draft transaction";
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

// Export the actions and reducer
export const { selectTransaction, updateDraftTransaction, clearError } = transactionSlice.actions;
export default transactionSlice.reducer;
