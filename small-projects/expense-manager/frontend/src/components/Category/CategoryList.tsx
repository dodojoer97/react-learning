import type { FC } from "react";
import { useContext, useEffect, useMemo, useCallback, memo } from "react";

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
	onSelect?: () => void;
	mode?: "list" | "grid";
}
const CategoryList: FC<Props> = ({ onSelect, mode = "list" }) => {
	console.log("re render CategoryList");
	// Store
	const { categories, fetchCategories } = useContext(SettingsContext);
	const { updateDraftTransaction, draftTransaction } = useContext(TransactionContext);

	// Memoized filtered category list by transaction type
	const categoryList: Category[] = useMemo(() => {
		return categories.filter((category) => category.type === draftTransaction?.type);
	}, [categories, draftTransaction?.type]);

	// Memoized handleSelect method to avoid re-creation on each render
	const handleSelect = useCallback((category: Category): void => {
		updateDraftTransaction({ categoryId: category.id });
		onSelect && onSelect();
	}, []);

	useEffect(() => {
		// If we did not load any categories, request them
		if (!categories.length) {
			fetchCategories();
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

export default memo(CategoryList);
