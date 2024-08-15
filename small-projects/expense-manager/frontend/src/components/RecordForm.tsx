// React
import type { FC } from "react";
import { useState, useContext } from "react";

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

// Utils
import { hasMinValue, hasMinLength } from "@/utils/utils";

interface IProps {
	amount: number;
	description: string;
	date: Date;
	type: CategoryType;
	onSave(): void;
}

const RecordForm: FC<IProps> = ({ amount, description, date, type, onSave }) => {
	// Store
	const settingsCTX = useContext(SettingsContext);

	// Hooks
	const amountField = useInput<HTMLInputElement, number>(amount || 0, (value) => {
		return hasMinValue(value, 4);
	});

	const { handleSubmit, error } = useFormSubmission(async () => {
		// await settingsCTX.editCategory(id, nameField.value);
		// onSave();
	});
	return (
		<Form
			className="mx-auto px-7 mb-0 mt-8 max-w-md space-y-4 flex flex-col justify-between h-[90%]"
			onSubmit={handleSubmit}
		></Form>
	);
};

export default RecordForm;
