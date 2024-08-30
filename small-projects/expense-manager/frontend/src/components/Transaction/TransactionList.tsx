import type { FC } from "react";
import { useContext } from "react";

// Store
import { TransactionContext } from "@/store/TransactionContext";

// Components
import Transaction from "@/components/Transaction/Transaction";

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
		</section>
	);
};

export default TransactionList;
