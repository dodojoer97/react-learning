// React
import { useState } from "react";
import type { ChangeEvent, FC } from "react";

// i18n
import { useTranslation } from "react-i18next";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Redux
import { RootState, AppDispatch } from "@/store/store"; // Correct store imports
import { updateDraftTransaction } from "@/store/transactionSlice"; // Action to update the draft transaction

// Components
import Form from "@/components/UI/Form";
import Button from "@/components/UI/Button";
import TextArea from "@/components/UI/TextArea";
import Dropdown from "../UI/Dropdown";

import DatePicker from "@/templates/mosaic/components/Datepicker";

// Hooks
import useInput from "@/hooks/useInput";
import moment from "moment";
import SelectFieldOption from "@/models/SelectFieldOption";
import { IRecurringTransaction, Frequency } from "@common";

interface IProps {
	onSave(): void;
}

type Recurring = "One time" | "Recurring";

// Local dropdown options
const recurringDropdownItems: SelectFieldOption<Recurring>[] = [
	new SelectFieldOption("One time", "One time"),
	new SelectFieldOption("Recurring", "Recurring"),
];

const frequencyItems: SelectFieldOption<Frequency>[] = [
	new SelectFieldOption("monthly", "monthly"),
	new SelectFieldOption("daily", "daily"),
	new SelectFieldOption("weekly", "weekly"),
	new SelectFieldOption("yearly", "yearly"),
];

// Forever date
const forever = new Date("2100-01-01");

const TransactionForm: FC<IProps> = ({ onSave }) => {
	// i18n
	const { t } = useTranslation();
	// Local state
	const [recurringType, setRecurring] = useState<string>(recurringDropdownItems[0].value);
	const [frequency, setFrequency] = useState<string>(frequencyItems[0].value);
	const [plannedEndDate, setPlannedEndDate] = useState(forever);

	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();
	const draftTransaction = useSelector((state: RootState) => state.transaction.draftTransaction);

	if (!draftTransaction) return <></>;

	// Computed
	const isPlanned: boolean = draftTransaction.status === "planned";
	const showRecurringFields: boolean = isPlanned && recurringType === "Recurring";

	// Form fields
	const descriptionField = useInput<HTMLTextAreaElement, string>({
		defaultValue: draftTransaction.description || "",
		changeFn: (value) => dispatch(updateDraftTransaction({ description: value })), // Dispatch the update to the draft transaction
	});

	// handlers
	const handleDropdownSelect = (item: string, type: "recurringType" | "frequency") => {
		if (type === "recurringType") {
			setRecurring(item);
		} else {
			setFrequency(item);
		}
	};

	const handleEndDateChange = (selectedDates: Date[]) => {
		setPlannedEndDate(selectedDates[0]);
	};

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent the default form submission

		// If planned update the fields accordingly
		if (isPlanned) {
			const recurring: IRecurringTransaction = {
				isRecurring: true,
				endDate: plannedEndDate.toISOString(),
				frequency: frequency as IRecurringTransaction["frequency"],
			};
			dispatch(updateDraftTransaction({ recurring }));
		}

		onSave(); // Custom save logic, likely to call another Redux action to save the draft
	};

	return (
		<Form
			className="mx-auto mb-0 mt-8 max-w-md space-y-4 lg:sticky lg:top-16 bg-gradient-to-r from-white/30 dark:from-gray-800/30 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700/60 "
			onSubmit={(e) => handleSave(e)}
		>
			<div className="py-8 px-4 lg:px-8 2xl:px-12">
				<div className="max-w-sm mx-auto lg:max-w-none">
					<h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-6">
						{t("transactions:details")}
					</h2>
					<div className="space-y-6">
						<div>
							<label
								className="block text-sm font-medium mb-1"
								htmlFor="transaction-date"
							>
								{t("transactions:date")}
							</label>
							<DatePicker
								mode="single"
								defaultDate={new Date(draftTransaction.date)}
								onChange={(selectedDates: Date[], dateStr: string) =>
									dispatch(
										updateDraftTransaction({
											date: moment(selectedDates[0]).format("YYYY-MM-DD"),
										})
									)
								}
							/>
						</div>

						{isPlanned && (
							<div className="space-y-6">
								<div>
									<Dropdown
										id="recurring"
										label={t("forms:recurringType")}
										items={recurringDropdownItems}
										onSelect={(item) =>
											handleDropdownSelect(item.value, "recurringType")
										}
									/>
								</div>
							</div>
						)}
						{showRecurringFields && (
							<>
								<div>
									<Dropdown
										id="frequency"
										label={t("forms:frequency")}
										items={frequencyItems}
										onSelect={(item) =>
											handleDropdownSelect(item.value, "frequency")
										}
									/>
								</div>
								<div>
									<label
										className="block text-sm font-medium mb-1"
										htmlFor="recursion-date"
									>
										{t("transactions:recursionDate")}
									</label>
									<DatePicker
										mode="single"
										defaultDate={forever}
										onChange={handleEndDateChange}
									/>
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			<TextArea
				id="description"
				label={t("forms:description")}
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
				{t("forms:save")}
			</Button>
		</Form>
	);
};

export default TransactionForm;
