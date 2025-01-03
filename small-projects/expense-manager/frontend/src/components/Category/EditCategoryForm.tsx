// React
import type { ChangeEvent, FC } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Correct store import path
import { editCategory } from "@/store/categorySlice"; // Import the editCategory action

// UI Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import InputError from "@/components/UI/InputError";

// i18n
import { useTranslation } from "react-i18next";

// Hooks
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

// Util
import { hasMinLength } from "@/utils/utils";

// Models
import { Category } from "@common";

interface IEditCategoryFormProps {
	id: string;
	name: string;
	onSave(): void;
}

const EditCategoryForm: FC<IEditCategoryFormProps> = ({ id, name, onSave }) => {
	// translations
	const { t } = useTranslation(["errors", "categories"]);

	// Redux store
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error } = useSelector((state: RootState) => state.settings); // Access loading and error state from settings slice
	const userId = useSelector((state: RootState) => state.auth.user?.uid);

	// Hooks
	const nameField = useInput<HTMLInputElement, string>({
		defaultValue: name,
		validationFn: (value) => hasMinLength(value, 4),
		errorMessage: t("errors:invalidLength", { min: 4 }),
	});

	// Handle form submission
	const { handleSubmit } = useFormSubmission(async () => {
		if (!userId) return;
		await dispatch(editCategory({ categoryId: id, newName: nameField.value, userId })); // Dispatch the editCategory action with required parameters
		onSave(); // Callback after save
	});

	return (
		<Form
			className="mx-auto px-7 mb-0 mt-8 max-w-md space-y-4 flex flex-col justify-between h-[90%]"
			key={id}
			onSubmit={handleSubmit}
		>
			<div>
				<Input
					id="name"
					label={t("forms:categoryName")}
					className="w-12"
					value={nameField.value}
					onChange={(e) =>
						nameField.handleInputChange(e as ChangeEvent<HTMLInputElement>)
					}
					onBlur={nameField.handleInputBlur}
					error={nameField.errorMessage}
				/>
			</div>
			{error && <InputError message={error} className="text-red-600" />}{" "}
			{/* Show error from Redux */}
			<Button
				type="submit"
				disabled={nameField.hasError || loading} // Disable if there's an error or if the form is loading
				className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white w-full"
			>
				{t("forms:save")}
			</Button>
		</Form>
	);
};

export default EditCategoryForm;
