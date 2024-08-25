// React
import type { FC } from "react";
import { useState, useContext } from "react";

// Store
import { TransactionContext } from "@/store/TransactionContext";

const TransactionList: FC = () => {
	// Store
	const transactionCTX = useContext(TransactionContext);

	// Data
	const mappedTransactions = transactionCTX.getMappedTransactions();
	console.log(mappedTransactions);
	return (
		<ul>
			{mappedTransactions.map(({ transaction, category }) => (
				<li key={transaction.id}>
					{transaction.amount} {transaction.categoryId}
					{category?.name}
				</li>
			))}
		</ul>
	);
};

export default TransactionList;
