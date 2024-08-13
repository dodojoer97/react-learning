// React
import { useEffect, useContext } from "react";
import type { FC } from "react";

// UI Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import InputError from "@/components/UI/InputError";

// Models
import { Category } from "@common";

import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

// Util
import { hasMinLength } from "@/utils/utils";

// Store
import { SettingsContext } from "@/store/SettingsContext";

interface IEditCategoryFormProps {
	id: string;
	name: string;
	onSave(): void;
}

const EditCategoryForm: FC<IEditCategoryFormProps> = ({ id, name, onSave }) => {
	// Store
	const settingsCTX = useContext(SettingsContext);

	// Hooks
	const nameField = useInput<HTMLInputElement, string>(name, (value) => {
		return hasMinLength(value, 4);
	});

	const { handleSubmit, error } = useFormSubmission(async () => {
		await settingsCTX.editCategory(id, nameField.value);
		onSave();
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
					label="name"
					className="w-12"
					value={nameField.value}
					onChange={nameField.handleInputChange}
					onBlur={nameField.handleInputBlur}
				/>
				{nameField.hasError && (
					<InputError message={"some error of length"} className="text-red-600" />
				)}
			</div>

			{error && <InputError message={error} className="text-red-600" />}

			<Button
				type="submit"
				disabled={nameField.hasError}
				className="inline-block rounded-lg w-full bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:bg-slate-400"
			>
				SAVE
			</Button>
		</Form>
	);
};

export default EditCategoryForm;
