import { AppDispatch, RootState } from "@/store/store";
import { getSettings } from "@/store/settingsSlice";
import { store } from "@/store/store"; // Import your Redux store if needed

export const settingsLoader = async (): Promise<void> => {
	const dispatch: AppDispatch = store.dispatch; // Get dispatch from the store

	const state: RootState = store.getState();
	const { user } = state.auth;

	if (user && user.uid) {
		await dispatch(getSettings({ userId: user.uid }));
	}
};
