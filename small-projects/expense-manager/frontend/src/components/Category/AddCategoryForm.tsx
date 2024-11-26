// React
import type { FC } from "react";
import { useState } from "react";

// i18n
import { useTranslation } from "react-i18next";

// Types
import type { CategoryType } from "@common";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Correct store import
import { addCategory } from "@/store/categorySlice"; // Import addCategory action

// Components
import Form from "@/components/UI/Form";
import IconSelector from "../UI/IconSelector";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import InputError from "@/components/UI/InputError";
import Dropdown from "@/components/UI/Dropdown";

// Hooks
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

// Util
import { hasMinLength } from "@/utils/utils";
import { Category } from "@common";
import SelectFieldOption from "@/models/SelectFieldOption";

interface IProps {
	onSave(): void;
}

const AddCategoryForm: FC<IProps> = ({ onSave }) => {
	// i18n
	const { t } = useTranslation();

	// Redux store
	const dispatch = useDispatch<AppDispatch>();
	const { availableCategoryTypes, loading } = useSelector((state: RootState) => state.categories); // Access availableCategoryTypes from Redux
	const { user } = useSelector((state: RootState) => state.auth);

	const [iconName, setIconName] = useState<string | null>(null);
	const [categoryType, setCategoryType] = useState<SelectFieldOption<string>>(
		availableCategoryTypes[0]
	);

	const categoryNameField = useInput<HTMLInputElement, string>({
		defaultValue: "",
		validationFn: (value: string) => {
			return hasMinLength(value, 4);
		},
		errorMessage: t("errors:invalidLength", { min: 4 }),
	});

	const handleSelectIcon = (iconName: string): void => {
		setIconName(iconName);
	};

	const { handleSubmit, error } = useFormSubmission(async () => {
		if (!iconName) return;
		const createdCategory = new Category(
			iconName,
			categoryNameField.value,
			"",
			categoryType?.value as CategoryType
		);

		if (user?.uid) {
			// Dispatch addCategory action with the created category
			await dispatch(addCategory({ category: createdCategory, userId: user?.uid })); // Replace with actual user ID
			onSave();
		}
	});

	return (
		<Form
			className="mx-auto mb-0 mt-8 max-w-md space-y-4 rounded p-4 flex flex-col justify-between h-[90%]"
			onSubmit={handleSubmit}
		>
			<div>
				<IconSelector onSelect={handleSelectIcon} selectedIcon={iconName || ""} />

				<Input
					id="name"
					label={t("forms:categoryName")}
					placeholder={t("forms:categoryName")}
					required
					value={categoryNameField.value}
					onChange={categoryNameField.handleInputChange}
					onBlur={categoryNameField.handleInputBlur}
					error={categoryNameField.errorMessage}
				/>

				<Dropdown
					id="type"
					label={t("forms:categoryType")}
					items={availableCategoryTypes} // Access available category types from Redux
					selectedItem={categoryType}
					onSelect={(value) => setCategoryType(value)}
				/>
			</div>

			{error && <InputError message={error} className="text-red-600" />}

			<Button
				type="submit"
				disabled={categoryNameField.hasError || !iconName || loading} // Disable if there are errors or the form is loading
				loading={loading}
				className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white w-full"
			>
				{t("forms:save")}
			</Button>
		</Form>
	);
};

export default AddCategoryForm;
