import type { FC } from "react";
import { useContext } from "react";

// Types
import { TransactionWithCategory } from "@/mappers/TransactionCategoryAssigner";

// Store
import { SettingsContext } from "@/store/SettingsContext";
import { TransactionContext } from "@/store/TransactionContext";
import { OpenContext } from "@/store/OpenContext";

// FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

// Translation
import { useTranslation } from "react-i18next";

interface Props {
	transactionWithCategory: TransactionWithCategory;
}

const Transaction: FC<Props> = ({ transactionWithCategory: { transaction, category } }) => {
	// Store
	const settingsCTX = useContext(SettingsContext);
	const transactionCTX = useContext(TransactionContext);
	const { open } = useContext(OpenContext);

	const panelId = "transactionPanel";

	// Translation
	const { i18n } = useTranslation();

	// Computed
	const icon: IconDefinition = transaction.type === "expense" ? faMinus : faPlus;
	const bgColor = transaction.type === "expense" ? "bg-red-500" : "bg-green-500";
	const textColor = transaction.type === "expense" ? "text-red-600" : "text-green-600";

	// Formats the date based on the current i18n language,
	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat(i18n.language, {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(date);
	};

	// Methods
	const handleClick = (): void => {
		transactionCTX.selectTransaction(transaction);
		open(panelId);
	};

	return (
		<li
			className="flex px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
			onClick={handleClick}
		>
			<div
				className={`w-9 h-9 rounded-full shrink-0 ${bgColor} my-2 mr-3 flex items-center justify-center`}
			>
				<FontAwesomeIcon icon={icon} className="text-white" />
			</div>
			<div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
				<div className="grow flex justify-between">
					<div className="self-center flex items-center space-x-2">
						{category?.icon && (
							<FontAwesomeIcon
								icon={category.icon as IconDefinition}
								className="text-blue-500 text-lg"
							/>
						)}
						<div className="font-medium text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white">
							{category?.name || "Uncategorized"}
						</div>
					</div>
					<div className="shrink-0 self-start ml-2">
						<time
							dateTime={transaction.date.toString()}
							className="text-xs text-gray-600 dark:text-gray-400 block"
						>
							{formatDate(transaction.date)}
						</time>
						<span className={`font-medium ${textColor}`}>
							{settingsCTX.currency.value} {transaction.amount.toFixed(2)}
						</span>
					</div>
				</div>
			</div>
		</li>
	);
};

export default Transaction;
