// React
import type { FC } from "react";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Import the store

// Components
import CategoriesDropdown from "@/components/UI/CategoriesDropdown";

const Categories: FC = () => {
	const categories = useSelector((state: RootState) => state.categories.categories);

	return <>{categories.length > 0 && <CategoriesDropdown categories={categories} />}</>;
};

export default Categories;
