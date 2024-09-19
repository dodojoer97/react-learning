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
}

const CategoryComp: FC<ICategoryProps> = ({ id, name, icon }) => {
	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();
	const categoryMode = useSelector((state: RootState) => state.settings.categoryMode);
	const draftTransaction = useSelector((state: RootState) => state.transaction.draftTransaction);
	const isPanelOpen = useSelector((state: RootState) => state.open.openSet.includes("category")); // Check if the panel is open

	// Check if in panel mode to set different displays, functions
	const isPanelMode: boolean = categoryMode === "panel";

	// Check if this category is selected
	const isSelected = draftTransaction?.categoryId === id;

	// Handle opening the sliding panel
	const handleOpen = () => {
		dispatch(toggleOpen("category"));
	};

	return (
		<>
			<article
				className={`flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-colors my-2 ${
					isPanelMode ? "cursor-pointer" : ""
				}
				${isPanelMode && isSelected ? "selected-item" : ""}
				`}
			>
				<div className="flex items-center">
					<FontAwesomeIcon
						icon={icon as IconDefinition}
						className="text-blue-500 text-2xl mr-4"
					/>
					<p className="text-lg font-semibold text-gray-800">{name}</p>
				</div>
				{!isPanelMode && (
					<Button onClick={handleOpen}>
						<FontAwesomeIcon icon={faPencil} />
					</Button>
				)}
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
