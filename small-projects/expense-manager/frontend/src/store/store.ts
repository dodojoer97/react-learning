import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./categorySlice";
import openReducer from "./openSlice";
import authReducer from "./authSlice"; // Import the auth reducer
import transactionReducer from "./transactionSlice";

// Configure the store
export const store = configureStore({
	reducer: {
		settings: settingsReducer,
		open: openReducer,
		auth: authReducer, // Add the auth reducer
		transaction: transactionReducer,
	},
});

// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
