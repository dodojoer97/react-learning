import type { FC } from "react";
import { useContext } from "react";

// Store
import { TransactionContext } from "@/store/TransactionContext";

// Components
import Transaction from "@/components/Transaction/Transaction";
import SlidingPanel from "@/components/UI/SlidingPanel";
import TransactionPanel from "@/components/Transaction/TransactionPanel";

const TransactionList: FC = () => {
	// Store
	const transactionCTX = useContext(TransactionContext);

	// Data
	const mappedTransactions = transactionCTX.getMappedTransactions();
	return (
		<section>
			{!!mappedTransactions.length && (
				<ul className="p-4 bg-white shadow-md rounded-lg transition-colors">
					{mappedTransactions.map((transactionWithCategory) => (
						<Transaction
							key={transactionWithCategory.transaction.id}
							transactionWithCategory={transactionWithCategory}
						/>
					))}
				</ul>
			)}

			<SlidingPanel isOpen={isOpen} onClose={toggleOpen} slideDirection="from-right">
				<TransactionPanel onSave={toggleOpen} />
			</SlidingPanel>
		</section>
	);
};

export default TransactionList;
