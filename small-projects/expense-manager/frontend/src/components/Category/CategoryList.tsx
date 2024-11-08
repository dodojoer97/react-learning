import type { FC } from "react";
import { useEffect, useMemo, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

// Types
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Components
import CategoryComp from "@/components/Category/Category";

// Store
import { RootState, AppDispatch } from "@/store/store"; // Redux store types
import { fetchCategories } from "@/store/categorySlice"; // Action to fetch categories
import { updateDraftTransaction } from "@/store/transactionSlice"; // Action to update draft transaction

// Models
import { Category } from "@common";

interface Props {
	onSelect?: () => void;
	mode?: "list" | "grid";
}

const CategoryList: FC<Props> = ({ onSelect, mode = "list" }) => {
	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();
	const categories = useSelector((state: RootState) => state.settings.categories);
	const draftTransaction = useSelector((state: RootState) => state.transaction.draftTransaction);
	const userId = useSelector((state: RootState) => state.auth.user?.uid);

	// Memoized filtered category list by transaction type
	const categoryList: Category[] = useMemo(() => {
		return categories.filter((category) => category.type === draftTransaction?.type);
	}, [categories, draftTransaction?.type]);

	// Memoized handleSelect method to avoid re-creation on each render
	const handleSelect = (category: Category): void => {
		console.log("handleSelect: ", handleSelect);
		dispatch(updateDraftTransaction({ categoryId: category.id }));
		onSelect && onSelect();
	};

	useEffect(() => {
		// If we did not load any categories, request them
		if (!categories.length && userId) {
			dispatch(fetchCategories(userId)); // Pass userId when fetching categories
		}
	}, [categories.length, userId, dispatch]);

	return (
		<ul
			className={`px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 space-y-2 ${
				mode === "grid" ? "grid grid-cols-3 gap-2" : "flex flex-col"
			}`}
		>
			{categoryList.map((category) => (
				<CategoryComp
					key={category.id}
					onClick={() => handleSelect(category)}
					id={category.id}
					name={category.name}
					icon={category.icon as IconDefinition}
				/>
			))}
		</ul>
	);
};

export default memo(CategoryList);
