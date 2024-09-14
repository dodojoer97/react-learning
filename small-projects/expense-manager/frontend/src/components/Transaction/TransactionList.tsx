import type { FC } from "react";
import { useContext, useEffect } from "react";

// Store
import { TransactionContext } from "@/store/TransactionContext";
import { SettingsContext } from "@/store/SettingsContext";

// Components
import Transaction from "@/components/Transaction/Transaction";
import SlidingPanel from "@/components/UI/SlidingPanel";
import TransactionPanel from "@/components/Transaction/TransactionPanel";
import Card from "@/components/UI/Card"; // Import the new Card component

// Context
import { OpenContext } from "@/store/OpenContext";

const TransactionList: FC = () => {
	// Store
	const transactionCTX = useContext(TransactionContext);
	const settingsCTX = useContext(SettingsContext);

	// Context
	const { isOpen, toggleOpen } = useContext(OpenContext);
	const panelId = "transactionPanel";

	useEffect(() => {
		// If we did not load any categories, request them
		const handleFetch = async () => {
			if (!settingsCTX.categories.length) {
				await settingsCTX.fetchCategories();
			}

			if (!transactionCTX.transactions.length) {
				await transactionCTX.fetchTransactions();
			}
		};
		handleFetch();
	}, []);

	// Data
	const mappedTransactions = transactionCTX.getMappedTransactions(settingsCTX.categories);

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
				isOpen={isOpen(panelId)}
				onClose={() => toggleOpen(panelId)}
				slideDirection="from-right"
			>
				<TransactionPanel onSave={() => toggleOpen(panelId)} />
			</SlidingPanel>
		</Card>
	);
};

export default TransactionList;
