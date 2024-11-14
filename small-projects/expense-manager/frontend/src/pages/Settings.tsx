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
	const { availableCurrencies, currency } = useSelector((state: RootState) => state.settings);

	return (
		<>
			<Form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
				{currency && (
					<Select
						value={currency.value}
						id="currency"
						label="Currency"
						options={availableCurrencies}
					/>
				)}
			</Form>
		</>
	);
};

export default Settings;
