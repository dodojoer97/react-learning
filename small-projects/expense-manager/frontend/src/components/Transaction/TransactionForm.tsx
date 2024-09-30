import type { ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { RootState, AppDispatch } from "@/store/store"; // Correct store imports
import { updateDraftTransaction } from "@/store/transactionSlice"; // Action to update the draft transaction

// Components
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import Button from "@/components/UI/Button";
import TextArea from "@/components/UI/TextArea";
import InputError from "@/components/UI/InputError";

import DatePicker from "@/templates/mosaic/components/Datepicker";

// Hooks
import useInput from "@/hooks/useInput";
import useIsMobile from "@/hooks/useIsMobile";
import moment from "moment";

interface IProps {
	onSave(): void;
}

const TransactionForm: FC<IProps> = ({ onSave }) => {
	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();
	const draftTransaction = useSelector((state: RootState) => state.transaction.draftTransaction);

	if (!draftTransaction) return <></>;

	// Hooks
	const isMobile: boolean = useIsMobile();

	// Form fields
	const descriptionField = useInput<HTMLTextAreaElement, string>({
		defaultValue: draftTransaction.description || "",
		changeFn: (value) => dispatch(updateDraftTransaction({ description: value })), // Dispatch the update to the draft transaction
	});

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent the default form submission
		onSave(); // Custom save logic, likely to call another Redux action to save the draft
	};

	return (
		<Form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={(e) => handleSave(e)}>
			<DatePicker
				mode="single"
				defaultDate={draftTransaction.date}
				onChange={(selectedDates: Date[], dateStr: string) =>
					dispatch(
						updateDraftTransaction({
							date: moment(selectedDates[0]).format("YYYY-MM-DD"),
						})
					)
				}
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
				className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white w-full"
			>
				Save
			</Button>
		</Form>
	);
};

export default TransactionForm;
