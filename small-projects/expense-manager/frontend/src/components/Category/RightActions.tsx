import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

// i18n
import { useTranslation } from "react-i18next";

// Store
import { toggleOpen, close } from "@/store/openSlice"; // Actions for managing open/close panels

import { AppDispatch, RootState } from "@/store/store"; // Redux store types

// Components
import Button from "@/components/UI/Button";
import SlidingPanel from "@/components/UI/SlidingPanel";
import AddCategoryForm from "@/components/Category/AddCategoryForm";

const RightActions: FC = () => {
	// i18n
	const { t } = useTranslation();

	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();

	// Get the open state for categories panel from Redux
	const isCategoriesOpen = useSelector((state: RootState) =>
		state.open.openSet.includes("categories")
	); // Check if 'categories' panel is open
	// Handle open logic
	const handleOpen = (): void => {
		dispatch(toggleOpen("categories")); // Open the sliding panel
	};

	return (
		<>
			<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
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
					<span className="max-xs:sr-only">{t("categories:add")}</span>
				</Button>
			</div>

			<SlidingPanel
				isOpen={isCategoriesOpen} // Access the isOpen state from Redux
				onClose={() => dispatch(toggleOpen("categories"))} // Dispatch to toggle panel state
			>
				<AddCategoryForm onSave={() => dispatch(toggleOpen("categories"))} />
			</SlidingPanel>
		</>
	);
};

export default RightActions;
