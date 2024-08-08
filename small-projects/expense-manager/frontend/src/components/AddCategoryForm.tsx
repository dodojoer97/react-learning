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

	const settingsCTX = useContext(SettingsContext);

	const categoryNameField = useInput("", (value: string) => {
		return hasMinLength(value, 4);
	});

	const typeField = useInput("", (value: string) => {
		return hasMinLength(value, 4);
	});

	const handleSelectIcon = (iconName: string): void => {
		setIconName(iconName);
	};

	const { handleSubmit, error } = useFormSubmission(async () => {
		if (!iconName) return;
		const createdCategory = new Category(iconName, categoryNameField.value, "");

		await settingsCTX.addCategory(createdCategory);
		onSave();
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

				<Select id="type" label="Category type" options={[]} value={typeField.value} />
			</div>

			{error && <InputError message={error} className="text-red-600" />}

			<Button
				type="submit"
				disabled={categoryNameField.hasError || !iconName}
				className="inline-block rounded-lg w-full bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:bg-slate-400"
			>
				SAVE
			</Button>
		</Form>
	);
};

export default AddCategoryForm;
