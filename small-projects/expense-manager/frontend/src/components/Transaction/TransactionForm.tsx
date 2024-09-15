// React
import type { ChangeEvent, FC } from "react";
import { useState, useContext } from "react";

// Types
import type { CategoryType } from "@common";

// Store
import { SettingsContext } from "@/store/SettingsContext";
import { TransactionContext } from "@/store/TransactionContext";

// Copmonents
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import Button from "@/components/UI/Button";
import TextArea from "@/components/UI/TextArea";
import InputError from "@/components/UI/InputError";
import DatePicker from "@/components/UI/Datepicker";
import CategoryList from "@/components/Category/CategoryList";

// Hooks
import useInput from "@/hooks/useInput";
import useIsMobile from "@/hooks/useIsMobile";

interface IProps {
	onSave(): void;
}

const TransactionForm: FC<IProps> = ({ onSave }) => {
	console.log("TransactionForm re render");
	// TODO add translations
	// Store
	const { draftTransaction, updateDraftTransaction } = useContext(TransactionContext);

	if (!draftTransaction) return <></>;

	// hooks
	const isMobile: boolean = true;

	// Form fields
	const dateField = useInput<HTMLInputElement, Date>({
		defaultValue: draftTransaction?.date,
		changeFn: (value) => updateDraftTransaction({ date: value }),
	});
	const descriptionField = useInput<HTMLTextAreaElement, string>({
		defaultValue: draftTransaction.description || "",
		changeFn: (value) => updateDraftTransaction({ description: value }),
	});

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent the default form submission
		onSave(); // Your custom save logic
	};

	return (
		<Form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={(e) => handleSave(e)}>
			<CategoryList mode={"grid"} />

			<DatePicker
				date={dateField.value}
				onChange={dateField.handleInputChange}
				onBlur={dateField.handleInputBlur}
			/>

			<TextArea
				id="description"
				label="Description"
				value={descriptionField.value}
				onChange={(e) =>
					descriptionField.handleInputChange(e as ChangeEvent<HTMLTextAreaElement>)
				}
				onBlur={descriptionField.handleInputBlur}
			/>
			<Button
				type="submit"
				className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
			>
				Save
			</Button>
		</Form>
	);
};

export default TransactionForm;
