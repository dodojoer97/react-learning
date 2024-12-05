import { createSlice, PayloadAction, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { Category } from "@common";
import SelectFieldOption from "@/models/SelectFieldOption";
import CategoryService from "@/services/CategoryService";
import categoryTypes from "@/data/categoryTypes";
import { RootState } from "./store";

// Define the state interface
export interface CategorState {
	availableCategoryTypes: SelectFieldOption<string>[];
	categories: Category[];
	categoryMode: "page" | "panel";
	loading: boolean;
	error: string | null; // Add error property to track errors
}

const initialState: CategorState = {
	availableCategoryTypes: categoryTypes,
	categories: [],
	categoryMode: "page",
	loading: true,
	error: null, // Initialize error as null
};

// Async actions (thunks)
export const fetchCategories = createAsyncThunk(
	"categories/fetchCategories",
	async (userId: string, { rejectWithValue }) => {
		const categoryService = new CategoryService();
		console.log("fetchCategories");
		try {
			const categories = await categoryService.getCategories(userId);
			return categories;
		} catch (error) {
			return rejectWithValue("Failed to fetch categories");
		}
	}
);

export const addCategory = createAsyncThunk(
	"categories/addCategory",
	async ({ category, userId }: { category: Category; userId: string }, { rejectWithValue }) => {
		const categoryService = new CategoryService();
		try {
			const newCategories = await categoryService.createCategory(category, userId);
			return newCategories;
		} catch (error) {
			return rejectWithValue("Failed to add category");
		}
	}
);

export const editCategory = createAsyncThunk(
	"categories/editCategory",
	async (
		{ categoryId, newName, userId }: { categoryId: string; newName: string; userId: string },
		{ rejectWithValue }
	) => {
		const categoryService = new CategoryService();
		try {
			await categoryService.editCategory(userId, categoryId, newName);
			return { categoryId, newName };
		} catch (error) {
			return rejectWithValue("Failed to edit category");
		}
	}
);

// Slice definition
const categorySlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
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
export const { setCategoryMode } = categorySlice.actions;
export default categorySlice.reducer;

export const selectCategories = createSelector(
	(state: RootState) => state.categories.categories,
	(categories) => categories
);
