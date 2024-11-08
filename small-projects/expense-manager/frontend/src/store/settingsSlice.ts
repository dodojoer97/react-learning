import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import currencies from "@/data/currencies";
import SelectFieldOption from "@/models/SelectFieldOption";

// Define the state interface
export interface SettingsState {
	currency: SelectFieldOption;
	availableCurrencies: SelectFieldOption[];
	loading: boolean;
	error: string | null; // Add error property to track errors
}
