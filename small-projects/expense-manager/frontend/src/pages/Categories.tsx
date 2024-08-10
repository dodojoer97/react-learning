// React
import type { FC } from "react";

import { useContext, useEffect } from "react";

// Translation
import { useTranslation } from "react-i18next";

// UI Components
import Layout from "@/components/UI/Layout";
import SlidingPanel from "@/components/UI/SlidingPanel";

// Components
import CategoryComp from "@/components/Category";
import AddCategoryForm from "@/components/AddCategoryForm";
import Tabs from "@/components/UI/Tabs";

// Store
import { SettingsContext } from "@/store/SettingsContext";
import { AuthContext } from "@/store/AuthContext";

// Hooks
import { Category } from "@common";
import useIsOpen from "@/hooks/useIsOpen";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Categories: FC = () => {
	const settingsCTX = useContext(SettingsContext);
	const { t } = useTranslation("settings");
	const { isOpen, toggleOpen } = useIsOpen(true);

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
					onClick={toggleOpen}
				/>
			</div>

			<SlidingPanel isOpen={isOpen} onClose={toggleOpen}>
				<AddCategoryForm onSave={toggleOpen} />
			</SlidingPanel>

			{/* Change type of cateogries */}
			{settingsCTX.categories.length && (
				<Tabs Component={CategoryComp} data={settingsCTX.categories} />
			)}
		</Layout>
	);
};

export default Categories;
