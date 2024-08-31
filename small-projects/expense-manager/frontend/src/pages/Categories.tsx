// React
import type { FC } from "react";
import { useContext, useEffect } from "react";

// Translation
import { useTranslation } from "react-i18next";

// UI Components
import Layout from "@/components/UI/Layout";
import SlidingPanel from "@/components/UI/SlidingPanel";

// Components
import AddCategoryForm from "@/components/AddCategoryForm";
import Tabs from "@/components/Category/CategoryTabs";

// Store
import { SettingsContext } from "@/store/SettingsContext";
import { OpenContext } from "@/store/OpenContext";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Categories: FC = () => {
	const settingsCTX = useContext(SettingsContext);
	const { t } = useTranslation("settings");
	const { isOpen, toggleOpen } = useContext(OpenContext);

	settingsCTX.setCategoryMode("page");

	useEffect(() => {
		settingsCTX.fetchCategories();
	}, []);

	return (
		<Layout>
			<div className="mx-auto max-w-lg text-center">
				<h1 className="text-2xl font-bold sm:text-3xl">{t("categoriesTitle")}</h1>
			</div>

			<div className="flex justify-end">
				<FontAwesomeIcon
					className="cursor-pointer w-10 h-10 text-blue-600"
					icon={faPlusCircle}
					onClick={() => toggleOpen("categories")}
				/>
			</div>

			<SlidingPanel isOpen={isOpen("categories")} onClose={() => toggleOpen("categories")}>
				<AddCategoryForm onSave={() => toggleOpen("categories")} />
			</SlidingPanel>

			<Tabs />
		</Layout>
	);
};

export default Categories;
