import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

// Store
import { toggleOpen, close } from "@/store/openSlice"; // Actions for managing open/close panels
import { selectTransaction } from "@/store/transactionSlice"; // Action for selecting the transaction
import { RootState, AppDispatch } from "@/store/store"; // Redux store types
import { defaultTransaction } from "@/store/TransactionContext"; // Default transaction structure

// Components
import TransactionPanel from "@/components/Transaction/TransactionPanel";
import SlidingPanel from "@/components/UI/SlidingPanel";

const RightActions: FC = () => {
	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();
	const isPanelOpen = useSelector((state: RootState) =>
		state.open.openSet.includes("dashboard-panel")
	); // Check if the dashboard panel is open

	// Handle open logic
	const handleOpen = (): void => {
		dispatch(selectTransaction(defaultTransaction)); // Select the default transaction
		dispatch(toggleOpen("dashboard-panel")); // Open the sliding panel
	};

	return (
		<>
			<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
				<button
					className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
					onClick={(e) => {
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
					<span className="max-xs:sr-only">Add Transaction</span>
				</button>
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
