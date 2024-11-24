import { AppDispatch, RootState } from "@/store/store";
import { fetchCategories } from "@/store/categorySlice";
import { store } from "@/store/store"; // Import your Redux store if needed

export const categoryLoader = async (): Promise<null> => {
	console.log("categoryLoader");
	const dispatch: AppDispatch = store.dispatch; // Get dispatch from the store

	const state: RootState = store.getState();
	const { user } = state.auth;

	if (user && user.uid) {
		await dispatch(fetchCategories(user.uid));
	}

	return null;
};
