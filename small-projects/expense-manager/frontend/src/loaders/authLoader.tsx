import { AppDispatch, RootState } from "@/store/store";
import { initializeAuth } from "@/store/authSlice";
import { redirect } from "react-router-dom";
import { store } from "@/store/store"; // Import your Redux store if needed

// Loader to handle authentication logic and return title
export const authLoader = async ({ title }: { title: string }) => {
	const dispatch: AppDispatch = store.dispatch; // Get dispatch from the store

	// Dispatch the initializeAuth action
	await dispatch(initializeAuth());

	// Get the updated state after initializing auth
	const state: RootState = store.getState();
	const isAuthenticated = state.auth.isAuthenticated;
	const isLoadingAuth = state.auth.loading;

	// If authentication is still loading, you could return a loading state (e.g., spinner)
	if (isLoadingAuth) {
		return null;
	}

	// If the user is not authenticated, redirect to the login page
	if (!isAuthenticated) {
		return redirect("/auth/login");
	}

	// Return the title for use in the component
	return { title };
};
