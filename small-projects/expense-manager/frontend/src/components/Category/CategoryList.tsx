// React
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
}

const CategoryList: FC<Props> = ({ onSelect }) => {
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
		<ul className="px-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
			{categoryList.map((category) => (
				<li
					key={category.id}
					className="me-2 pb-2 cursor-pointer"
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