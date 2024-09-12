import type { FC } from "react";
import { useContext } from "react";

// Store
import { TransactionContext } from "@/store/TransactionContext";

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

	// Context
	const { isOpen, toggleOpen } = useContext(OpenContext);
	const panelId = "transactionPanel";

	// Data
	const mappedTransactions = transactionCTX.getMappedTransactions();

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
