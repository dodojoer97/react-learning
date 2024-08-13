// React
import type { FC } from "react";
import { useState } from "react";

// Types
import type { CategoryType } from "@common";

// Store
import { SettingsContext } from "@/store/SettingsContext";
import { AuthContext } from "@/store/AuthContext";

// Copmonents
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import Button from "@/components/UI/Button";
import InputError from "@/components/UI/InputError";

// Hooks
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

interface IProps {
	onSave(): void;
}

const RecordForm: FC<IProps> = (...props) => {
	// Store
	const settingsCTX = useContext(SettingsContext);

	// Hooks
	const nameField = useInput<HTMLInputElement>(name, (value) => {
		return hasMinLength(value, 4);
	});

	const { handleSubmit, error } = useFormSubmission(async () => {
		await settingsCTX.editCategory(id, nameField.value);
		onSave();
	});
	return (
		<Form
			className="mx-auto px-7 mb-0 mt-8 max-w-md space-y-4 flex flex-col justify-between h-[90%]"
			onSubmit={handleSubmit}
		></Form>
	);
};

export default RecordForm;
