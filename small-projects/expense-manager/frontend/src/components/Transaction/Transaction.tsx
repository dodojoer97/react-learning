import type { FC } from "react";

// Types
import { TransactionWithCategory } from "@/mappers/TransactionCategoryAssigner";

interface Props {
	transactionWithCategory: TransactionWithCategory;
}

const Transaction: FC<Props> = ({ transactionWithCategory: { transaction, category } }) => {
	return (
		<li className="flex justify-between items-center">
			<div className="icon" aria-label="Transaction Icon">
				icon
			</div>
			<div className="title" aria-label="Transaction Category">
				{category?.name}
			</div>
			<div className="amount-date text-right">
				<time dateTime={transaction.date.toString()} className="block">
					{/* TODO map to date earlier */}
					{new Date(transaction.date.toString()).getFullYear()}
				</time>
				<div aria-label="Transaction Amount">{transaction.amount}</div>
			</div>
		</li>
	);
};

export default Transaction;
