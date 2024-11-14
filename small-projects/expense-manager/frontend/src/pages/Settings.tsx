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
import Card from "@/components/UI/Card";
import Dropdown from "@/components/UI/Dropdown";
import SelectFieldOption from "@/models/SelectFieldOption";

const Settings: FC = () => {
	const { t } = useTranslation("settings");

	// Redux: Select available currencies from the settings slice
	const { availableCurrencies, currency } = useSelector((state: RootState) => state.settings);

	return (
		<Card>
			<div className="grow">
				<Form>
					{currency && (
						<Dropdown
							id="currency"
							items={availableCurrencies.map(
								(option) => new SelectFieldOption(option, option)
							)}
						/>
					)}
				</Form>
			</div>
		</Card>
	);
};

export default Settings;
