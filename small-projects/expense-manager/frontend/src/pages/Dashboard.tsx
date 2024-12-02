import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// Components
import TransactionList from "@/components/Transaction/TransactionList";
import TransactionDoughnut from "@/components/Transaction/TransactionDoughnut";
import TransactionLineChart from "@/components/Transaction/TransactionLineChart";

// Selectors
import { selectCategories } from "@/store/categorySlice";
import { selectTransactions } from "@/store/transactionSlice";

// Actions
import { fetchCategories } from "@/store/categorySlice";
import { fetchTransactions } from "@/store/transactionSlice";

// Store Types
import { RootState, AppDispatch } from "@/store/store";

const Dashboard: FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch<AppDispatch>();

	const userId = useSelector((state: RootState) => state.auth.user?.uid);
	const categories = useSelector(selectCategories);
	const transactions = useSelector(selectTransactions);

	// Fetch categories and transactions when the component mounts
	useEffect(() => {
		if (!userId) return; // Skip if no userId is available

		// Dispatch fetch actions
		if (!categories.length) {
			dispatch(fetchCategories(userId));
		}
		dispatch(fetchTransactions({ userId }));
	}, [userId, dispatch, categories.length]);

	// Render the dashboard content
	return (
		<div className="grid grid-cols-12 gap-6">
			<TransactionDoughnut />
			<TransactionList status="completed" title={t("transactions:latest")} limit={5} />
			<TransactionLineChart />
		</div>
	);
};

export default Dashboard;
