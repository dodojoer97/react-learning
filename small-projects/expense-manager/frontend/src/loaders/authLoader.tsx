import { AppDispatch, RootState } from "@/store/store";
import { initializeAuth } from "@/store/authSlice";
import { redirect } from "react-router-dom";
import { store } from "@/store/store"; // Import your Redux store if needed

// Loader to handle authentication logic
export const authLoader = async () => {
	const dispatch: AppDispatch = store.dispatch; // Get dispatch from the store

	// Dispatch the initializeAuth action
	await dispatch(initializeAuth());

	// Get the updated state after initializing auth
	const state: RootState = store.getState();
	const isAuthenticated = state.auth.isAuthenticated;
	const isLoadingAuth = state.auth.loading;

	// If authentication is still loading, you could return some loading state or spinner if desired (React Router does not directly support loading UI in loaders)
	if (isLoadingAuth) {
		// Optionally, you can return some status or even a loading flag here
		return null;
	}

	// If the user is not authenticated, redirect to login page
	if (!isAuthenticated) {
		return redirect("/login");
	}

	// Return nothing if the user is authenticated (the route will render normally)
	return null;
};
