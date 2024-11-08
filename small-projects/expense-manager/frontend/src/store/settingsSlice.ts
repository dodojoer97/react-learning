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
	currency: SelectFieldOption;
	availableCurrencies: SelectFieldOption[];
	loading: boolean;
	error: string | null; // Add error property to track errors
}

const initialState: SettingsState = {
	currency: currencies[0],
	availableCurrencies: currencies,
	loading: true,
	error: null, // Initialize error as null
};

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
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getSettings.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSettings.fulfilled, (state, action: PayloadAction<UserSettings>) => {
				state.currency = action.payload.currency;
				state.loading = false;
				state.error = null;
			});
	},
});

export default settingsSlice.reducer;
