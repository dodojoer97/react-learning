import type { FC } from "react";
import { useContext, useEffect } from "react";

// Types
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Components
import CategoryComp from "@/components/Category/Category";

// Store
import { SettingsContext } from "@/store/SettingsContext";
import { TransactionContext } from "@/store/TransactionContext";

// Models
import { Category } from "@common";

interface Props {
	onSelect(): void;
	mode?: "list" | "grid";
}

const CategoryList: FC<Props> = ({ onSelect, mode = "list" }) => {
	// Store
	const settingsCTX = useContext(SettingsContext);
	const transactionCTX = useContext(TransactionContext);

	// Filtered Category list by transaction type
	const categoryList: Category[] = settingsCTX.categories.filter(
		(category) => category.type === transactionCTX.draftTransaction?.type
	);

	// Methods
	const handleSelect = (category: Category): void => {
		transactionCTX.updateDraftTransaction({ categoryId: category.id });
		onSelect();
	};

	useEffect(() => {
		// If we did not load any categories, request them
		if (!settingsCTX.categories.length) {
			settingsCTX.fetchCategories();
		}
	}, []);

	return (
		<ul
			className={`px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 space-y-2 ${
				mode === "grid" ? "grid grid-cols-3" : ""
			}`}
		>
			{categoryList.map((category) => (
				<li
					key={category.id}
					className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
					onClick={() => handleSelect(category)}
				>
					<CategoryComp
						id={category.id}
						name={category.name}
						icon={category.icon as IconDefinition}
					/>
				</li>
			))}
		</ul>
	);
};

export default CategoryList;
