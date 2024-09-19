import type { FC } from "react";
import { useEffect, useMemo } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions, getMappedTransactions } from "@/store/transactionSlice"; // Fetch transactions and mapped transactions
import { fetchCategories } from "@/store/settingsSlice"; // Fetch categories
import { toggleOpen } from "@/store/openSlice"; // Open and close sliding panel
import { RootState, AppDispatch } from "@/store/store"; // Store types

// Components
import Transaction from "@/components/Transaction/Transaction";
import SlidingPanel from "@/components/UI/SlidingPanel";
import TransactionPanel from "@/components/Transaction/TransactionPanel";
import Card from "@/components/UI/Card"; // Import the new Card component

const TransactionList: FC = () => {
	console.log("Re-render TransactionList");

	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();
	const transactions = useSelector((state: RootState) => state.transaction.transactions);
	const categories = useSelector((state: RootState) => state.settings.categories);
	const openSet = useSelector((state: RootState) => state.open.openSet); // Check if panel is open
	const userId = useSelector((state: RootState) => state.auth.user?.uid); // Fetch the userId from the auth state

	// Sliding panel identifier
	const panelId = "transactionPanel";

	// Fetch categories and transactions when the component mounts
	useEffect(() => {
		const handleFetch = async () => {
			if (!categories.length && userId) {
				await dispatch(fetchCategories(userId)); // Use userId when fetching categories
			}

			if (!transactions.length && userId) {
				await dispatch(fetchTransactions(userId)); // Use userId when fetching transactions
			}
		};
		handleFetch();
	}, [dispatch, categories.length, transactions.length, userId]);

	// Memoized mapped transactions
	const mappedTransactions = useMemo(
		() => getMappedTransactions(transactions, categories),
		[transactions, categories]
	);

	return (
		<Card title="Transactions">
			{!!mappedTransactions.length && (
				<ul>
					{mappedTransactions.map((transactionWithCategory) => (
						<Transaction
							key={transactionWithCategory.transaction.id}
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
