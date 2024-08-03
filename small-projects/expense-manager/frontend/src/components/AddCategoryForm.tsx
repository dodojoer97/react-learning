// React
import type { FC } from "react";
import { useState, useContext } from "react";

// Store
import { SettingsContext } from "@/store/SettingsContext";
import { AuthContext } from "@/store/AuthContext";

// Copmonents
import Form from "@/components/UI/Form";
import IconSelector from "./IconSelector";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import InputError from "@/components/UI/InputError";

// Hooks
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

// Util
import { hasMinLength } from "@/utils/utils";
import Category from "@/models/Category";

const AddCategoryForm: FC = () => {
	// TODO ADD TRANSLATIONS
	const [iconName, setIconName] = useState<string | null>(null);

	const settingsCTX = useContext(SettingsContext);
	const authCTX = useContext(AuthContext);

	const categoryNameField = useInput("", (value: string) => {
		return hasMinLength(value, 4);
	});

	const handleSelectIcon = (iconName: string): void => {
		setIconName(iconName);
	};

	const { handleSubmit } = useFormSubmission(async () => {
		if (!iconName) return;
		const createdCategory = new Category(iconName, categoryNameField.value, "");

		await settingsCTX.addCategory(createdCategory);
	});

	return (
		<Form
			className="mx-auto mb-0 mt-8 max-w-md space-y-4 bg-red-50 rounded p-4"
			onSubmit={handleSubmit}
		>
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

			<Button
				type="submit"
				disabled={categoryNameField.hasError}
				className="inline-block rounded-lg w-full bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:bg-slate-400"
			>
				SAVE
			</Button>
		</Form>
	);
};

export default AddCategoryForm;
