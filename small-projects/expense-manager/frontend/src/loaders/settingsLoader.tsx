import { AppDispatch, RootState } from "@/store/store";
import { getSettings } from "@/store/settingsSlice";
import { store } from "@/store/store"; // Import your Redux store if needed
import SelectFieldOption from "@/models/SelectFieldOption";

export const settingsLoader = async (): Promise<SelectFieldOption | null> => {
	const dispatch: AppDispatch = store.dispatch; // Get dispatch from the store

	const state: RootState = store.getState();
	const { user } = state.auth;
	const { currency } = state.settings;

	if (user && user.uid) {
		await dispatch(getSettings({ userId: user.uid }));
	}

	return currency || null;
};
