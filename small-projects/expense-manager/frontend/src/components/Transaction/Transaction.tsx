// React
import type { FC } from "react";
import { useContext } from "react";

// Types
import { TransactionWithCategory } from "@/mappers/TransactionCategoryAssigner";

// Store
import { SettingsContext } from "@/store/SettingsContext";
import { TransactionContext } from "@/store/TransactionContext";

// FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Translation
import { useTranslation } from "react-i18next";

interface Props {
	transactionWithCategory: TransactionWithCategory;
}

const Transaction: FC<Props> = ({ transactionWithCategory: { transaction, category } }) => {
	// Store
	const settingsCTX = useContext(SettingsContext);
	const transactionCTX = useContext(TransactionContext);

	// Translation
	const { i18n } = useTranslation();

	// TODO move to context
	// Formats the date based on the current i18n language,
	const formatDate = (date: Date) => {
		console.log("i18n.language: ", i18n.language);
		return new Intl.DateTimeFormat(i18n.language, {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(date);
	};

	// Methods
	const handleClick = (): void => {
		transactionCTX.selectTransaction(transaction);
	};

	return (
		<li
			className="p-4 hover:bg-gray-100 rounded-lg transition-colors my-2 border-b border-gray-300 cursor-pointer"
			onClick={handleClick}
		>
			<div className="flex justify-between">
				<div className="flex">
					<FontAwesomeIcon
						icon={category?.icon as IconDefinition}
						className="text-blue-500 text-2xl mr-3"
					/>
					<div className="font-semibold text-gray-700" aria-label="Transaction Category">
						{category?.name}
					</div>
				</div>
				<div className="text-right">
					<time
						dateTime={transaction.date.toString()}
						className="text-sm text-gray-600 block font-medium"
					>
						{formatDate(transaction.date)}
					</time>
					<div
						className="text-lg text-gray-800 font-semibold"
						aria-label="Transaction Amount"
					>
						{settingsCTX.currency.value} {transaction.amount.toFixed(2)}
					</div>
				</div>
			</div>
			{transaction.description && (
				<p className="mt-1 text-gray-600">{transaction.description}</p>
			)}
		</li>
	);
};

export default Transaction;
