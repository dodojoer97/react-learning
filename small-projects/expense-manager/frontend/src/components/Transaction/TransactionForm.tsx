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

// Hooks
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

interface IProps {
	onSave(): void;
}

const TransactionForm: FC<IProps> = ({ onSave }) => {
	// TODO add translations
	// Store
	const transactionCTX = useContext(TransactionContext);
	const settingsCTX = useContext(SettingsContext);

	if (!transactionCTX.draftTransaction) return <></>;

	// Form fields
	const dateField = useInput<HTMLInputElement, Date>(transactionCTX.draftTransaction?.date);
	const typeField = useInput<HTMLSelectElement, CategoryType>(
		transactionCTX.draftTransaction.type
	);
	const descriptionField = useInput<HTMLTextAreaElement, string>(
		transactionCTX.draftTransaction.description || ""
	);

	return (
		<Form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={onSave}>
			<DatePicker
				date={dateField.value}
				onChange={dateField.handleInputChange}
				onBlur={dateField.handleInputBlur}
			/>

			<Select
				id="type"
				label="Category type"
				options={settingsCTX.availableCategoryTypes}
				value={typeField.value}
				onChange={(e) => typeField.handleInputChange(e as ChangeEvent<HTMLSelectElement>)}
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
		</Form>
	);
};

export default TransactionForm;
