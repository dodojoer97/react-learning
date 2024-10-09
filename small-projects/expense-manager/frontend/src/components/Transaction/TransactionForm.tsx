// React
import { useState } from "react";
import type { ChangeEvent, FC } from "react";

// Redux
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
import Dropdown from "../UI/Dropdown";

import DatePicker from "@/templates/mosaic/components/Datepicker";

// Hooks
import useInput from "@/hooks/useInput";
import useIsMobile from "@/hooks/useIsMobile";
import moment from "moment";
import SelectFieldOption from "@/models/SelectFieldOption";
import { IRecurringTransaction } from "../../../../common/src/models/Transaction";

interface IProps {
	onSave(): void;
}

type Recurring = "One time" | "Recurring";

// Local dropdown options
const recurringDropdownItems: Recurring[] = ["One time", "Recurring"];
const frequencyItems: Array<IRecurringTransaction["frequency"]> = [
	"monthly",
	"daily",
	"weekly",
	"yearly",
];

// Forever date
const forever = new Date("2100-01-01");

const TransactionForm: FC<IProps> = ({ onSave }) => {
	// Local state
	const [recurringType, setRecurring] = useState<string>(recurringDropdownItems[0]);
	const [frequency, setFrequency] = useState<string>(frequencyItems[0] as string);
	const [plannedEndDate, setPlannedEndDate] = useState(forever);

	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();
	const draftTransaction = useSelector((state: RootState) => state.transaction.draftTransaction);

	if (!draftTransaction) return <></>;

	// Computed
	const isPlanned: boolean = draftTransaction.status === "planned";
	const showRecurringFields: boolean = isPlanned && recurringType === "Recurring";

	// Hooks
	const isMobile: boolean = useIsMobile();

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

	const handleEndDateChange = (selectedDates: Date[], dateStr: string) => {
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
						Transaction Details
					</h2>
					<div className="space-y-6">
						<div>
							<div>
								<label className="block text-sm font-medium mb-1" htmlFor="card-nr">
									Transaction Date
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
						</div>

						{isPlanned && (
							<div className="space-y-6">
								<div>
									<label
										className="block text-sm font-medium mb-1"
										htmlFor="card-nr"
									>
										Recurring type
									</label>
									<Dropdown
										id="recurring"
										label="Recurring type"
										items={recurringDropdownItems}
										// onSelect={(item: string) =>
										// 	handleDropdownSelect(item, "recurringType")
										// }
									/>
								</div>
							</div>
						)}
					</div>

					{showRecurringFields && (
						<div className="space-y-6">
							<Dropdown
								id="frequency"
								label="Frequency"
								items={frequencyItems as string[]}
								onSelect={(item: string) => handleDropdownSelect(item, "frequency")}
							/>
							<label htmlFor="recurringDate">End Date</label>
							<DatePicker
								mode="single"
								defaultDate={forever}
								onChange={handleEndDateChange}
							/>
						</div>
					)}
				</div>
			</div>

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
