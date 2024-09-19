// React
import type { FC } from "react";
import { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Import the store
import { setCategoryMode, fetchCategories } from "@/store/settingsSlice"; // Import actions from settings slice
import { toggleOpen } from "@/store/openSlice"; // Import toggle action from open slice

// Translation
import { useTranslation } from "react-i18next";

// UI Components
import Layout from "@/components/UI/Layout";
import SlidingPanel from "@/components/UI/SlidingPanel";

// Components
import AddCategoryForm from "@/components/AddCategoryForm";
import Tabs from "@/components/Category/CategoryTabs";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Categories: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { t } = useTranslation("settings");

	// Get the open state for categories panel from Redux
	const isCategoriesOpen = useSelector((state: RootState) =>
		state.open.openSet.includes("categories")
	); // Check if 'categories' panel is open

	const userId = useSelector((state: RootState) => state.auth.user?.uid);

	// Dispatch to set category mode and fetch categories
	useEffect(() => {
		dispatch(setCategoryMode("page"));
		if (userId) {
			dispatch(fetchCategories(userId)); // Pass userId when fetching categories
		}
	}, [dispatch, userId]);

	return (
		<Layout>
			<div className="mx-auto max-w-lg text-center">
				<h1 className="text-2xl font-bold sm:text-3xl">{t("categoriesTitle")}</h1>
			</div>

			<div className="flex justify-end">
				<FontAwesomeIcon
					className="cursor-pointer w-10 h-10 text-blue-600"
					icon={faPlusCircle}
					onClick={() => dispatch(toggleOpen("categories"))} // Use dispatch to toggle open state
				/>
			</div>

			<SlidingPanel
				isOpen={isCategoriesOpen} // Access the isOpen state from Redux
				onClose={() => dispatch(toggleOpen("categories"))} // Dispatch to toggle panel state
			>
				<AddCategoryForm onSave={() => dispatch(toggleOpen("categories"))} />
			</SlidingPanel>

			<Tabs />
		</Layout>
	);
};

export default Categories;
