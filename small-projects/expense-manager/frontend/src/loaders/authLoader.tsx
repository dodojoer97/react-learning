import { AppDispatch, RootState } from "@/store/store";
import { initializeAuth, getUserInfo } from "@/store/authSlice";

import { redirect } from "react-router-dom";
import { store } from "@/store/store"; // Import your Redux store if needed
import { getSettings } from "@/store/settingsSlice";

// Loader to handle authentication logic and return title

export const authLoader = async (token?: string) => {
	const dispatch: AppDispatch = store.dispatch; // Get dispatch from the store

	// Dispatch the initializeAuth action
	await dispatch(initializeAuth(token || null));

	// Get the updated state after initializing auth
	const state: RootState = store.getState();
	const isAuthenticated = state.auth.isAuthenticated;
	const isLoadingAuth = state.auth.loading;

	const { user } = state.auth;
	const { currency } = state.settings;

	// If authentication is still loading, you could return a loading state (e.g., spinner)
	if (isLoadingAuth) {
		return null;
	}

	// If the user is not authenticated, redirect to the login page
	if (!isAuthenticated && !user) {
		return redirect("/auth/login");
	}

	if (user) {
		await dispatch(getUserInfo(user.uid));
	}

	// fetch the settings if not fetched
	if (user && !currency) {
		await dispatch(getSettings({ userId: user.uid }));
	}

	// Return the title for use in the component
	return null;
};
