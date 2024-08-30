import type { FC } from "react";

// Types
import { TransactionWithCategory } from "@/mappers/TransactionCategoryAssigner";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Translation
import { useTranslation } from "react-i18next";

interface Props {
	transactionWithCategory: TransactionWithCategory;
}

const Transaction: FC<Props> = ({ transactionWithCategory: { transaction, category } }) => {
	const { i18n } = useTranslation();

	const formatDate = (date: Date) => {
		console.log("i18n.language: ", i18n.language);
		return new Intl.DateTimeFormat("en-GB").format(date);
	};
	return (
		<li className="flex justify-between  p-4 hover:bg-gray-50 rounded-lg transition-colors my-2 border-b-2 cursor-pointer">
			<div className="icon" aria-label="Transaction Icon">
				<FontAwesomeIcon
					icon={category?.icon as IconDefinition}
					className="text-blue-500 text-2xl mr-4"
				/>
			</div>
			<div className="title" aria-label="Transaction Category">
				{category?.name}
			</div>
			<div className="amount-date text-right">
				<time dateTime={transaction.date.toString()} className="block">
					{/* TODO map to date earlier */}
					{formatDate(transaction.date)}
				</time>
				<div aria-label="Transaction Amount">{transaction.amount}</div>
			</div>
		</li>
	);
};

export default Transaction;
