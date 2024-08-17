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

	if (!transactionCTX.draftTransaction) return <></>;

	// Form fields
	const dateField = useInput<HTMLInputElement, Date>(transactionCTX.draftTransaction?.date);

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
				className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:bg-slate-400"
			>
				Save
			</Button>
		</Form>
	);
};

export default TransactionForm;
