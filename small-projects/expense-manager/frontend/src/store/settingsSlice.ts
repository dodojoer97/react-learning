import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "@common";
import SelectFieldOption from "@/models/SelectFieldOption";
import SettingsService from "@/services/SettingsService";
import currencies from "@/data/currencies";
import categoryTypes from "@/data/categoryTypes";

// Define the state interface
export interface SettingsState {
	currency: SelectFieldOption;
	availableCurrencies: SelectFieldOption[];
	availableCategoryTypes: SelectFieldOption[];
	categories: Category[];
	categoryMode: "page" | "panel";
	loading: boolean;
	error: string | null; // Add error property to track errors
}

const initialState: SettingsState = {
	currency: currencies[0],
	availableCurrencies: currencies,
	availableCategoryTypes: categoryTypes,
	categories: [],
	categoryMode: "page",
	loading: true,
	error: null, // Initialize error as null
};

// Async actions (thunks)
export const fetchCategories = createAsyncThunk(
	"settings/fetchCategories",
	async (userId: string, { rejectWithValue }) => {
		const settingsService = new SettingsService();
		try {
			const categories = await settingsService.getCategories(userId);
			return categories || [];
		} catch (error) {
			return rejectWithValue("Failed to fetch categories");
		}
	}
);

export const addCategory = createAsyncThunk(
	"settings/addCategory",
	async ({ category, userId }: { category: Category; userId: string }, { rejectWithValue }) => {
		const settingsService = new SettingsService();
		try {
			const newCategories = await settingsService.createCategory(category, userId);
			return newCategories;
		} catch (error) {
			return rejectWithValue("Failed to add category");
		}
	}
);

export const editCategory = createAsyncThunk(
	"settings/editCategory",
	async (
		{ categoryId, newName, userId }: { categoryId: string; newName: string; userId: string },
		{ rejectWithValue }
	) => {
		const settingsService = new SettingsService();
		try {
			await settingsService.editCategory(userId, categoryId, newName);
			return { categoryId, newName };
		} catch (error) {
			return rejectWithValue("Failed to edit category");
		}
	}
);

// Slice definition
const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setCurrency: (state, action: PayloadAction<SelectFieldOption>) => {
			state.currency = action.payload;
		},
		setCategoryMode: (state, action: PayloadAction<"page" | "panel">) => {
			state.categoryMode = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch categories
			.addCase(fetchCategories.pending, (state) => {
				state.loading = true;
				state.error = null; // Reset error on new request
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.categories = action.payload;
				state.loading = false;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string; // Set error message on failure
			})

			// Add category
			.addCase(addCategory.pending, (state) => {
				state.loading = true;
				state.error = null; // Reset error on new request
			})
			.addCase(addCategory.fulfilled, (state, action) => {
				state.categories = action.payload;
				state.loading = false;
			})
			.addCase(addCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string; // Set error message on failure
			})

			// Edit category
			.addCase(editCategory.pending, (state) => {
				state.loading = true;
				state.error = null; // Reset error on new request
			})
			.addCase(editCategory.fulfilled, (state, action) => {
				const { categoryId, newName } = action.payload;
				state.categories = state.categories.map((category) =>
					category.id === categoryId ? { ...category, name: newName } : category
				);
				state.loading = false;
			})
			.addCase(editCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string; // Set error message on failure
			});
	},
});

// Export actions and reducer
export const { setCurrency, setCategoryMode } = settingsSlice.actions;
export default settingsSlice.reducer;
