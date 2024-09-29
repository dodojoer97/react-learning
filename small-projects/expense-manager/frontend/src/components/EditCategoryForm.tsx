// React
import type { ChangeEvent, FC } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Correct store import path
import { editCategory } from "@/store/settingsSlice"; // Import the editCategory action

// UI Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import InputError from "@/components/UI/InputError";

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
	// Redux store
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error } = useSelector((state: RootState) => state.settings); // Access loading and error state from settings slice
	const userId = useSelector((state: RootState) => state.auth.user?.uid);

	// Hooks
	const nameField = useInput<HTMLInputElement, string>({
		defaultValue: name,
		validationFn: (value) => hasMinLength(value, 4),
	});

	console.log("nameField: ", nameField);

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
					label="Category Name"
					className="w-12"
					value={nameField.value}
					onChange={(e) =>
						nameField.handleInputChange(e as ChangeEvent<HTMLInputElement>)
					}
					onBlur={nameField.handleInputBlur}
				/>
				{nameField.hasError && (
					<InputError
						message="Category name must be at least 4 characters long"
						className="text-red-600"
					/>
				)}
			</div>
			{error && <InputError message={error} className="text-red-600" />}{" "}
			{/* Show error from Redux */}
			<Button
				type="submit"
				disabled={nameField.hasError || loading} // Disable if there's an error or if the form is loading
				className="inline-block rounded-lg w-full bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:bg-slate-400"
			>
				{loading ? "Saving..." : "SAVE"} {/* Show loading state */}
			</Button>
		</Form>
	);
};

export default EditCategoryForm;
