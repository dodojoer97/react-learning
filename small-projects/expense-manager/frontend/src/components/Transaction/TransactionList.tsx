import type { FC } from "react";
import { useEffect, useMemo } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions, getMappedTransactions } from "@/store/transactionSlice"; // Fetch transactions and mapped transactions
import { fetchCategories } from "@/store/settingsSlice"; // Fetch categories
import { toggleOpen } from "@/store/openSlice"; // Open and close sliding panel
import { RootState, AppDispatch } from "@/store/store"; // Store types

// Components
import TransactionComp from "@/components/Transaction/Transaction";
import SlidingPanel from "@/components/UI/SlidingPanel";
import TransactionPanel from "@/components/Transaction/TransactionPanel";
import Card from "@/components/UI/Card"; // Import the new Card component

// Types
import { CategoryType, Transaction } from "@common";

interface TransactionListProps {
	title: string;
	limit?: number; // Optional prop to limit the number of transactions displayed
	type?: CategoryType; // Optional prop to display a certain type of transactions
	status?: Transaction["status"]; // Optional prop to display a certain status of transactions
}

const TransactionList: FC<TransactionListProps> = ({ title, limit, type, status }) => {
	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();
	const transactions = useSelector((state: RootState) => state.transaction.transactions);
	const categories = useSelector((state: RootState) => state.settings.categories);
	const openSet = useSelector((state: RootState) => state.open.openSet); // Check if panel is open
	const userId = useSelector((state: RootState) => state.auth.user?.uid); // Fetch the userId from the auth state
	const selectedDates = useSelector((state: RootState) => state.transaction.selectedDates);

	// Sliding panel identifier
	const panelId = "transactionPanel";

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

	// Memoized mapped transactions
	const mappedTransactions = useMemo(
		() => getMappedTransactions(transactions, categories, type, status),
		[transactions, categories]
	);

	// Limiting the number of transactions displayed if 'limit' prop is passed
	const displayedTransactions = useMemo(
		() => (limit ? mappedTransactions.slice(0, limit) : mappedTransactions),
		[mappedTransactions, limit]
	);

	return (
		<Card title={title}>
			{!!displayedTransactions.length && (
				<ul>
					{displayedTransactions.map((transactionWithCategory, index) => (
						<TransactionComp
							key={`${transactionWithCategory.transaction.id}- ${index}`}
							transactionWithCategory={transactionWithCategory}
						/>
					))}
				</ul>
			)}

			<SlidingPanel
				isOpen={openSet.includes(panelId)} // Check if the panel is open using the openSet from Redux
				onClose={() => dispatch(toggleOpen(panelId))} // Close the panel using Redux
				slideDirection="from-right"
			>
				<TransactionPanel onSave={() => dispatch(toggleOpen(panelId))} />
			</SlidingPanel>
		</Card>
	);
};

export default TransactionList;
