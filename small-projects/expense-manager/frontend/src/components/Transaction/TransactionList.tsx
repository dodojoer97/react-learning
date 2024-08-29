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
			<ul>
				{mappedTransactions.map((transactionWithCategory) => (
					<Transaction
						key={transactionWithCategory.transaction.id}
						transactionWithCategory={transactionWithCategory}
					/>
				))}
			</ul>
		</section>
	);
};

export default TransactionList;
