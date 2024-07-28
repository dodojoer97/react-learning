// React
import type { FC } from "react";

import { useContext, useEffect } from "react";

// Translation
import { useTranslation } from "react-i18next";

// UI Components
import Layout from "@/components/UI/Layout";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import InputError from "@/components/UI/InputError";

// Components
import CategoryComp from "@/components/Category";

// Store
import { SettingsContext } from "@/store/SettingsContext";
import { AuthContext } from "@/store/AuthContext";

// Hooks
import Category from "@/models/Category";

const Categories: FC = () => {
	const settingsCTX = useContext(SettingsContext);
	const { t } = useTranslation("settings");

	useEffect(() => {
		settingsCTX.fetchCategories();
	}, []);

	return (
		<Layout>
			<div className="mx-auto max-w-lg text-center">
				<h1 className="text-2xl font-bold sm:text-3xl">{t("categoriesTitle")}</h1>
			</div>
			<Form className="mx-auto mb-0 mt-8 max-w-md space-y-4"></Form>

			<ul>
				{settingsCTX.categories.map((category: Category) => (
					<CategoryComp key={category.id} category={category} />
				))}
			</ul>
		</Layout>
	);
};

export default Categories;
