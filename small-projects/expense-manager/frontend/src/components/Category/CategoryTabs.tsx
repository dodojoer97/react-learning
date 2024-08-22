// React
import type { FC } from "react";
import { useContext } from "react";

// Store
import { SettingsContext } from "@/store/SettingsContext";

// Components
import Tabs from "@/components/UI/PageTabs";
import CategoryComp from "@/components/Category/Category";

const CategoryTabs: FC = () => {
	const settingsCTX = useContext(SettingsContext);

	return (
		<>
			{settingsCTX.categories.length && (
				<Tabs Component={CategoryComp} data={settingsCTX.categories} />
			)}
		</>
	);
};

export default CategoryTabs;
