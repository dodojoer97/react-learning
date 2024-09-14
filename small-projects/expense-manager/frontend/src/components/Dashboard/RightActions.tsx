// React
import type { FC } from "react";
import { useContext } from "react";

// Store
import { OpenContext } from "@/store/OpenContext";
import { TransactionContext, defaultTransaction } from "@/store/TransactionContext";

// Components
import TransactionPanel from "@/components/Transaction/TransactionPanel";
import SlidingPanel from "@/components/UI/SlidingPanel";

const RightActions: FC = () => {
	// Store
	const { open, isOpen, toggleOpen, close } = useContext(OpenContext);
	const { selectTransaction } = useContext(TransactionContext);
	// TODO maybe add to config
	const dashboardPanelId = "dashboard-panel";

	const handleOpen = (): void => {
		selectTransaction(defaultTransaction);
		open(dashboardPanelId);
	};

	return (
		<>
			<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
				{/* Filter button */}
				{/* <FilterButton align="right" /> */}
				{/* Datepicker built with flatpickr */}
				{/* <Datepicker align="right" /> */}
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
			<SlidingPanel
				isOpen={isOpen(dashboardPanelId)}
				onClose={() => toggleOpen(dashboardPanelId)}
				slideDirection="from-right"
			>
				<TransactionPanel onSave={() => close(dashboardPanelId)} />
			</SlidingPanel>
		</>
	);
};

export default RightActions;
