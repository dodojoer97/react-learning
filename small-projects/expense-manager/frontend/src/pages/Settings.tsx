// React
import type { FC } from "react";

import { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Import the store using the new preferred path

// Translation
import { useTranslation } from "react-i18next";

// Components
import Layout from "@/components/UI/Layout";
import Form from "@/components/UI/Form";
import Select from "@/components/UI/Select";

const Settings: FC = () => {
	const { t } = useTranslation("settings");

	// Redux: Select available currencies from the settings slice
	const { availableCurrencies } = useSelector((state: RootState) => state.settings);

	return (
		<Layout>
			<div className="mx-auto max-w-lg text-center">
				<h1 className="text-2xl font-bold sm:text-3xl">{t("settingsTitle")}</h1>
			</div>
			<Form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
				<Select id="currency" label="Currency" options={availableCurrencies} />
			</Form>
		</Layout>
	);
};

export default Settings;
