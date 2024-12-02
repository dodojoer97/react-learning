// React
import type { FC } from "react";
import { useEffect } from "react";

// i18n
import { useTranslation } from "react-i18next";

// Components
import TransactionList from "@/components/Transaction/TransactionList";
import TransactionDoughnut from "@/components/Transaction/TransactionDoughnut";
import TransactionLineChart from "@/components/Transaction/TransactionLineChart";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Store
import { fetchCategories } from "@/store/categorySlice"; // Fetch categories
import { RootState, AppDispatch } from "@/store/store"; // Store types
import { fetchTransactions } from "@/store/transactionSlice";

// TODO add translations
const Dashboard: FC = () => {
	console.log("re render Dashboard");
	const { t } = useTranslation();

	const userId = useSelector((state: RootState) => state.auth.user?.uid); // Fetch the userId from the auth state
	const categories = useSelector((state: RootState) => state.categories.categories);

	const dispatch = useDispatch<AppDispatch>();

	// Fetch categories and transactions when the component mounts
	useEffect(() => {
		const handleFetch = async () => {
			if (!categories.length && userId) {
				await dispatch(fetchCategories(userId)); // Use userId when fetching categories
			}

			if (userId) {
				await dispatch(fetchTransactions({ userId })); // Use userId when fetching transactions
			}
		};
		handleFetch();
	}, []);

	return (
		<div className="grid grid-cols-12 gap-6">
			<TransactionDoughnut />
			<TransactionList status="completed" title={t("transactions:latest")} limit={5} />
			<TransactionLineChart />
		</div>
	);
};

export default Dashboard;
