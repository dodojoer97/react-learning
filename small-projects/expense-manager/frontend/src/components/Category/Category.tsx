import type { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, IconDefinition } from "@fortawesome/free-solid-svg-icons";

// UI Components
import Button from "@/components/UI/Button";
import SlidingPanel from "@/components/UI/SlidingPanel";
import EditCategoryForm from "@/components/EditCategoryForm";

// Store
import { RootState, AppDispatch } from "@/store/store"; // Redux store types
import { toggleOpen } from "@/store/openSlice"; // Action to toggle sliding panel
import { selectTransaction } from "@/store/transactionSlice"; // Action to manage draft transaction

interface ICategoryProps {
	id: string;
	name: string;
	icon: IconDefinition;
	onClick?: () => void;
}

const CategoryComp: FC<ICategoryProps> = ({ id, name, icon, onClick }) => {
	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();
	const categoryMode = useSelector((state: RootState) => state.settings.categoryMode);
	const draftTransaction = useSelector((state: RootState) => state.transaction.draftTransaction);

	const panelId = `category-panel-${id}`;

	const isPanelOpen = useSelector((state: RootState) => state.open.openSet.includes(panelId)); // Check if the panel is open

	// Check if in panel mode to set different displays, functions
	const isPanelMode: boolean = categoryMode === "panel";

	// Check if this category is selected
	const isSelected = draftTransaction?.categoryId === id;

	// Handle opening the sliding panel
	const handleOpen = () => {
		dispatch(toggleOpen(panelId));
	};

	return (
		<>
			<article
				onClick={onClick}
				className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors  border-b border-gray-100 dark:border-gray-700/60 px-2 ${
					isPanelMode ? "cursor-pointer" : ""
				}
				${isPanelMode && isSelected ? "selected-item" : ""}
				`}
			>
				<div className="flex">
					<div className="grow flex items-center text-sm py-2">
						<div className="grow flex justify-between">
							<div className="self-center flex items-center space-x-2">
								<FontAwesomeIcon
									icon={icon as IconDefinition}
									className="text-blue-500 text-lg"
								/>
								<div className="font-medium text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white">
									{name || "Uncategorized"}
								</div>
							</div>
							<div className="shrink-0 self-start ml-2">
								{!isPanelMode && (
									<Button onClick={handleOpen}>
										<FontAwesomeIcon icon={faPencil} />
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
				{/* <div className="flex items-center">
					<p className="text-lg font-semibold text-gray-800">{name}</p>
				</div> */}
			</article>

			{!isPanelMode && (
				<SlidingPanel isOpen={isPanelOpen} onClose={handleOpen}>
					<EditCategoryForm id={id} name={name} onSave={handleOpen} />
				</SlidingPanel>
			)}
		</>
	);
};

export default CategoryComp;
