import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

// i18n
import { useTranslation } from "react-i18next";

// Store
import { toggleOpen, close } from "@/store/openSlice"; // Actions for managing open/close panels
import {
	selectTransaction,
	defaultTransaction,
	fetchTransactions,
	setSelectedDates,
} from "@/store/transactionSlice"; // Action for selecting the transaction
import { RootState, AppDispatch } from "@/store/store"; // Redux store types

// Components
import TransactionPanel from "@/components/Transaction/TransactionPanel";
import SlidingPanel from "@/components/UI/SlidingPanel";
import Datepicker from "@/components/UI/Datepicker";
import Button from "@/components/UI/Button";

// Moment
import moment from "moment";

// UUID
import { v4 } from "uuid";

const RightActions: FC = () => {
	// i18n
	const { t } = useTranslation();

	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();

	const isPanelOpen = useSelector((state: RootState) =>
		state.open.openSet.includes("dashboard-panel")
	); // Check if the dashboard panel is open

	const userId = useSelector((state: RootState) => state.auth.user?.uid); // Fetch the userId from the auth state

	// Handle open logic
	const handleOpen = (): void => {
		dispatch(selectTransaction({ ...defaultTransaction, id: v4() })); // Select the default transaction with a new id
		dispatch(toggleOpen("dashboard-panel")); // Open the sliding panel
	};

	const handleDateChange = (selectedDates: Date[], dateStr: string): void => {
		if (!userId) return;

		const [startDate, endDate] = selectedDates;

		// Execute the request if we have 2 selected dates
		if (startDate && endDate) {
			const formattedStartDate: string = moment(startDate).format("YYYY-MM-DD");
			const formattedEndDate: string = moment(endDate).format("YYYY-MM-DD");

			dispatch(setSelectedDates([formattedStartDate, formattedEndDate]));

			dispatch(
				fetchTransactions({
					userId,
					startDate: formattedStartDate,
					endDate: formattedEndDate,
				})
			);
		}
	};

	return (
		<>
			<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
				<Datepicker onChange={handleDateChange} />
				<Button
					className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
					onClick={(e: React.MouseEvent) => {
						e.stopPropagation();
						handleOpen();
					}}
				>
					<svg
						className="fill-current shrink-0 xs:hidden"
						width="16"
						height="16"
						viewBox="0 0 16 16"
					>
						<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
					</svg>
					<span className="max-xs:sr-only">{t("transactions:add")}</span>
				</Button>
			</div>

			{/* Sliding Panel for Transaction Form */}
			<SlidingPanel
				isOpen={isPanelOpen} // Use Redux selector to check if the panel is open
				onClose={() => dispatch(toggleOpen("dashboard-panel"))} // Use Redux action to toggle the panel
				slideDirection="from-right"
			>
				<TransactionPanel onSave={() => dispatch(close("dashboard-panel"))} />{" "}
				{/* Close the panel when saved */}
			</SlidingPanel>
		</>
	);
};

export default RightActions;
