// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Redux store types

// Checks if any of the slices have loading states
const useLoading = (): boolean => {
	const loadingTransaction = useSelector((state: RootState) => state.transaction.loading);
	const loadingSettings = useSelector((state: RootState) => state.settings.loading);
	const loadingAuth = useSelector((state: RootState) => state.auth.loading);

	const isLoadingAny: boolean = loadingTransaction || loadingSettings || loadingAuth;

	// Determine if any context is currently loading
	return isLoadingAny;
};

export default useLoading;
