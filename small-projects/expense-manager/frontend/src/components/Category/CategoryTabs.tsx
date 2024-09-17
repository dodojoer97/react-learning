import type { FC } from "react";
import { useSelector } from "react-redux";

// Store
import { RootState } from "@/store/store"; // Redux store types

// Components
import Tabs from "@/components/UI/PageTabs";
import CategoryComp from "@/components/Category/Category";

const CategoryTabs: FC = () => {
	// Use `useSelector` to get categories from the Redux store
	const categories = useSelector((state: RootState) => state.settings.categories);

	return <>{categories.length > 0 && <Tabs Component={CategoryComp} data={categories} />}</>;
};

export default CategoryTabs;
