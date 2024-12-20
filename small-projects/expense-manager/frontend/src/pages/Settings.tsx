// React
import type { FC } from "react";

import { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Import the store using the new preferred path
import { setCurrency, setNumberSeperator, updateSettings } from "@/store/settingsSlice";
import { setCategoryMode, fetchCategories } from "@/store/categorySlice"; // Import actions from settings slice

// Translation
import { useTranslation } from "react-i18next";

// Components
import Form from "@/components/UI/Form";
import Card from "@/components/UI/Card";
import Dropdown from "@/components/UI/Dropdown";
import Button from "@/components/UI/Button";
import useFormSubmission from "@/hooks/useFormSubmission";

// Models
import User from "@/models/User";
import SelectFieldOption from "@/models/SelectFieldOption";

const Settings: FC = () => {
	// i18n
	const { t } = useTranslation(["forms"]);

	// Redux
	const dispatch = useDispatch<AppDispatch>();

	// Redux: Select available currencies from the settings slice
	const { availableCurrencies, currency, numberSeperator, availableNumberSeperators } =
		useSelector((state: RootState) => state.settings);
	const { uid: userId } = useSelector((state: RootState) => state.auth.user as User);

	if (!currency) return <>Cannot load without data</>;

	// State
	const [selectedCurrency, setSelectedCurrency] = useState<SelectFieldOption<string>>(currency);
	const [selectedSeperator, setSelectedSeperator] =
		useState<SelectFieldOption<string>>(numberSeperator);

	const { handleSubmit, isLoading, error } = useFormSubmission(async () => {
		setCurrency(selectedCurrency);
		setNumberSeperator(selectedSeperator);

		await dispatch(
			updateSettings({
				userId,
				fields: {
					currency: selectedCurrency.value,
					numberSeperator: selectedSeperator.value,
				},
			})
		);
	});

	// Dispatch to set category mode and fetch categories
	useEffect(() => {
		dispatch(setCategoryMode("page"));
		if (userId) {
			dispatch(fetchCategories(userId)); // Pass userId when fetching categories
		}
	}, [dispatch, userId]);

	return (
		<Card>
			<div className="grow">
				<Form onSubmit={handleSubmit}>
					<Dropdown
						id="currency"
						label={t("forms:currency")}
						items={availableCurrencies.map((option) => option)}
						selectedItem={selectedCurrency}
						onSelect={(option) => setSelectedCurrency(option)}
					/>
					<Dropdown
						id="seperator"
						label={t("forms:seperator")}
						items={availableNumberSeperators.map((option) => option)}
						selectedItem={selectedSeperator}
						onSelect={(option) => setSelectedSeperator(option)}
					/>
					<div className="flex justify-end py-5">
						<Button
							type="submit"
							disabled={isLoading} // Disable if there are errors or the form is loading
							className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3"
							loading={isLoading}
						>
							{t("forms:save")}
						</Button>
					</div>
				</Form>
			</div>
		</Card>
	);
};

export default Settings;
