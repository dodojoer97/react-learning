// React
import type { FC } from "react";
import { useContext } from "react";

// Store
import { OpenContext } from "@/store/OpenContext";

const RightActions: FC = () => {
	// TODO maybe add to config
	const dashboardModalId = "dashboard-modal";

	const { close, isOpen, open, toggleOpen } = useContext(OpenContext);

	const handleOpen = (): void => {
		toggleOpen(dashboardModalId);
	};

	return (
		<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
			{/* Filter button */}
			{/* <FilterButton align="right" /> */}
			{/* Datepicker built with flatpickr */}
			{/* <Datepicker align="right" /> */}
			{/* Add view button */}
			<button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
				<svg
					className="fill-current shrink-0 xs:hidden"
					width="16"
					height="16"
					viewBox="0 0 16 16"
				>
					<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
				</svg>
				<span
					className="max-xs:sr-only"
					onClick={(e) => {
						e.stopPropagation();
						handleOpen();
					}}
				>
					Add View
				</span>
			</button>
		</div>
	);
};

export default RightActions;
