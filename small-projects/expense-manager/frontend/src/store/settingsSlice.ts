// Redux
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Data
import currencies from "@/data/currencies";

// Models
import SelectFieldOption from "@/models/SelectFieldOption";

// Service
import SettingsService from "@/services/SettingsService";

// Initialize the SettingsService
const settingsService = new SettingsService();

// Common
import { UserSettings } from "@common";

// Define the state interface
export interface SettingsState {
	currency: SelectFieldOption<string> | null;
	numberSeperator: SelectFieldOption<UserSettings["numberSeperator"]>;
	availableCurrencies: SelectFieldOption<string>[];
	availableNumberSeperators: SelectFieldOption<UserSettings["numberSeperator"]>[];
	loading: boolean;
	error: string | null; // Add error property to track errors
}

const initialState: SettingsState = {
	currency: null,
	availableCurrencies: currencies,
	availableNumberSeperators: [
		{ label: ",", value: "," },
		{ label: ".", value: "." },
	],
	numberSeperator: { label: ".", value: "." },
	loading: false,
	error: null, // Initialize error as null
};

// Helper function to find matching currency
const findCurrency = (currencyValue: string): SelectFieldOption<string> =>
	currencies.find((currency) => currency.value === currencyValue) || currencies[0];

// Async actions (thunks)
export const getSettings = createAsyncThunk<
	UserSettings,
	{ userId: string },
	{ rejectValue: string }
>("settings/getSettings", async ({ userId }, { rejectWithValue }) => {
	try {
		const settings = await settingsService.getSettings(userId);
		return settings;
	} catch (error: any) {
		return rejectWithValue(error.message || "Failed to fetch transactions");
	}
});

export const updateSettings = createAsyncThunk<
	UserSettings,
	{ userId: string; fields: Partial<Omit<UserSettings, "id" | "userId">> },
	{ rejectValue: string }
>("settings/updateSettings", async ({ userId, fields }, { rejectWithValue }) => {
	try {
		const settings = await settingsService.updateSettings(userId, fields);
		return settings;
	} catch (error: any) {
		return rejectWithValue(error.message || "Failed to fetch transactions");
	}
});

// Slice definition
const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setCurrency(state, action: PayloadAction<SelectFieldOption<string>>) {
			state.currency = action.payload;
		},
		setNumberSeperator(
			state,
			action: PayloadAction<SelectFieldOption<UserSettings["numberSeperator"]>>
		) {
			state.numberSeperator = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSettings.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSettings.fulfilled, (state, action: PayloadAction<UserSettings>) => {
				// Set the currency in the state, or default if not found
				state.currency = findCurrency(action.payload.currency);
				state.numberSeperator = {
					value: action.payload.numberSeperator,
					label: action.payload.numberSeperator,
				};
				state.loading = false;
				state.error = null;
			})
			.addCase(getSettings.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Something went wrong in getSettings";
			})
			.addCase(updateSettings.fulfilled, (state, action: PayloadAction<UserSettings>) => {
				// Set the currency in the state, or default if not found
				state.currency = findCurrency(action.payload.currency);
				state.loading = false;
				state.error = null;
			})
			.addCase(updateSettings.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Something went wrong in updateSettings";
			});
	},
});

export const { setCurrency, setLoading, setNumberSeperator } = settingsSlice.actions;

export default settingsSlice.reducer;
