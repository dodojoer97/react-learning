import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

// Types
import { TransactionWithCategory } from "@/mappers/TransactionCategoryAssigner";
import { RootState, AppDispatch } from "@/store/store"; // Redux store types

// Store actions
import { selectTransaction } from "@/store/transactionSlice";
import { toggleOpen } from "@/store/openSlice";

// FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

// Translation
import { useTranslation } from "react-i18next";
import Button from "../UI/Button";

interface Props {
	transactionWithCategory: TransactionWithCategory;
}

const Transaction: FC<Props> = ({ transactionWithCategory: { transaction, category } }) => {
	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();
	const currency = useSelector((state: RootState) => state.settings.currency); // Fetch currency from Redux
	const userId = useSelector((state: RootState) => state.auth.user?.uid);

	const panelId = "transactionPanel";

	// Translation
	const { i18n } = useTranslation();

	// Computed
	const textColor = transaction.type === "expense" ? "text-red-600" : "text-green-600";

	// Formats the date based on the current i18n language,
	const formatDate = (date: string) => {
		return new Intl.DateTimeFormat(i18n.language, {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(new Date(date));
	};

	// Methods
	const handleClick = (): void => {
		dispatch(selectTransaction(transaction)); // Dispatch the action to select the transaction
		dispatch(toggleOpen(panelId)); // Dispatch the action to open the sliding panel
	};

	return (
		<li
			className="flex px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
			onClick={handleClick}
		>
			<div
				className={`w-9 h-9 rounded-full shrink-0 bg-red-500 my-2 mr-3 flex items-center justify-center`}
				onClick={() => {}}
			>
				<FontAwesomeIcon icon={faMinus} className="text-white" />
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
							{currency.value} {transaction.amount.toFixed(2)}
						</span>
					</div>
				</div>
			</div>
		</li>
	);
};

export default Transaction;
