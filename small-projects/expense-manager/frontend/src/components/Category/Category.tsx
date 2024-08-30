// React
import { useEffect, useContext } from "react";
import type { FC } from "react";

// Models
import { Category } from "@common";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, IconDefinition } from "@fortawesome/free-solid-svg-icons";

// UI Components
import Button from "@/components/UI/Button";
import SlidingPanel from "@/components/UI/SlidingPanel";
import EditCategoryForm from "@/components/EditCategoryForm";

// Hooks
import useIsOpen from "@/hooks/useIsOpen";

// Store
import { SettingsContext } from "@/store/SettingsContext";
import { TransactionContext } from "@/store/TransactionContext";

interface ICategoryProps {
	id: string;
	name: string;
	icon: IconDefinition;
}

const CategoryComp: FC<ICategoryProps> = ({ id, name, icon }) => {
	// TODO ADD TRANSLATIONS
	// Store
	const settingsCTX = useContext(SettingsContext);
	const transactionCTX = useContext(TransactionContext);

	// Hooks
	const { isOpen, toggleOpen } = useIsOpen("category");

	// Check if in panel mode to set differnet displays, functions
	const isPanelMode: boolean = settingsCTX.categoryMode === "panel";

	const isSelected = transactionCTX.draftTransaction?.categoryId === id;

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
					<Button onClick={toggleOpen}>
						<FontAwesomeIcon icon={faPencil} />
					</Button>
				)}
			</article>

			{!isPanelMode && (
				<SlidingPanel isOpen={isOpen} onClose={toggleOpen}>
					<EditCategoryForm id={id} name={name} onSave={toggleOpen} />
				</SlidingPanel>
			)}
		</>
	);
};

export default CategoryComp;
