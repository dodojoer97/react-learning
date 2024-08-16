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
import TextArea from "@/components/UI/TextArea";
import InputError from "@/components/UI/InputError";
import Calculator from "@/components/Calculator";
import TypeTabs from "@/components/Record/TypeTabs";

// Hooks
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

// Utils
import { hasMinValue, hasMinLength } from "@/utils/utils";

interface IProps {
	onSave(): void;
	amount?: number;
	description?: string;
	date?: Date;
	type?: CategoryType;
}

const RecordForm: FC<IProps> = ({
	amount = 0,
	description = "",
	date = new Date(),
	type = "expense",
	onSave,
}) => {
	// TODO add translations
	// Store
	const settingsCTX = useContext(SettingsContext);

	// State
	const [selectedType, setSelectedType] = useState<CategoryType>(type);
	const [currentAmount, setCurrentAmount] = useState<number>(amount);

	// Hooks

	// Methods
	const handleTabClick = (value: string) => {
		setSelectedType(value as CategoryType);
	};

	const handleCalculatorChange = (amount: number) => {
		setCurrentAmount(amount);
	};

	return (
		<>
			<section className="flex flex-col gap-0 h-[100%]">
				<TypeTabs
					items={settingsCTX.availableCategoryTypes}
					activeTab={selectedType}
					onSelect={handleTabClick}
				/>
				<Calculator
					amount={amount}
					onChange={handleCalculatorChange}
					additionalClasses=""
				/>
			</section>

			{/* <Form
			className="mx-auto px-7 mb-0 mt-8 max-w-md space-y-4 flex flex-col justify-between h-[90%]"
			onSubmit={handleSubmit}
		> */}
			{/* <Input
				id="amount"
				label="amount"
				placeholder="Amount"
				required
				value={amountField.value}
				onChange={amountField.handleInputChange}
				onBlur={amountField.handleInputBlur}
				type="number"
			/>

			{amountField.hasError && (
				<InputError message={"some error of number"} className="text-red-600" />
			)} */}

			{/* 
			<Input
				id="date"
				label="date"
				placeholder="date"
				required
				value={dateField.value.toISOString()}
				onChange={dateField.handleInputChange}
				onBlur={dateField.handleInputBlur}
				type="date"
			/>

			{amountField.hasError && (
				<InputError message={"some error of number"} className="text-red-600" />
			)}

			<Select
				id="type"
				label="Category type"
				options={settingsCTX.availableCategoryTypes}
				value={typeField.value}
				onChange={typeField.handleInputChange}
			/>

			<TextArea
				id="description"
				label="Description"
				value={descriptionField.value}
				onChange={descriptionField.handleInputChange}
				onBlur={descriptionField.handleInputBlur}
			/> */}
			{/* </Form> */}
		</>
	);
};

export default RecordForm;
