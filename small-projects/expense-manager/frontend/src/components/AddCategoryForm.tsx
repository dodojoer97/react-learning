// React
import type { FC } from "react";
import { useState } from "react";

// Types
import type { CategoryType } from "@common";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Correct store import
import { addCategory } from "@/store/settingsSlice"; // Import addCategory action

// Components
import Form from "@/components/UI/Form";
import IconSelector from "./IconSelector";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import Button from "@/components/UI/Button";
import InputError from "@/components/UI/InputError";

// Hooks
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

// Util
import { hasMinLength } from "@/utils/utils";
import { Category } from "@common";

interface IProps {
	onSave(): void;
}

const AddCategoryForm: FC<IProps> = ({ onSave }) => {
	// TODO ADD TRANSLATIONS
	const [iconName, setIconName] = useState<string | null>(null);

	// Redux store
	const dispatch = useDispatch<AppDispatch>();
	const { availableCategoryTypes, loading } = useSelector((state: RootState) => state.settings); // Access availableCategoryTypes from Redux
	const { user } = useSelector((state: RootState) => state.auth);

	const categoryNameField = useInput<HTMLInputElement, string>({
		defaultValue: "",
		validationFn: (value: string) => {
			return hasMinLength(value, 4);
		},
	});

	const typeField = useInput<HTMLSelectElement, string>({
		defaultValue: "expense",
		validationFn: (value: string) => {
			return hasMinLength(value, 4);
		},
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
			typeField.value as CategoryType
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
					label="Category name"
					placeholder="Category name"
					required
					value={categoryNameField.value}
					onChange={categoryNameField.handleInputChange}
					onBlur={categoryNameField.handleInputBlur}
				/>

				{categoryNameField.hasError && (
					<InputError message={"some error of length"} className="text-red-600" />
				)}

				<Select
					id="type"
					label="Category type"
					options={availableCategoryTypes} // Access available category types from Redux
					value={typeField.value}
					onChange={typeField.handleInputChange}
				/>
			</div>

			{error && <InputError message={error} className="text-red-600" />}

			<Button
				type="submit"
				disabled={categoryNameField.hasError || !iconName || loading} // Disable if there are errors or the form is loading
				className="inline-block rounded-lg w-full bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:bg-slate-400"
			>
				{loading ? "Saving..." : "SAVE"} {/* Show loading state */}
			</Button>
		</Form>
	);
};

export default AddCategoryForm;
