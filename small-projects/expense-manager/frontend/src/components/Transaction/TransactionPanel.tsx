import type { FC } from "react";
import { useState, useContext, useEffect, useCallback } from "react";

// Types
import type { CategoryType, OperationStatus } from "@common";

// Store
import { SettingsContext } from "@/store/SettingsContext";
import { TransactionContext } from "@/store/TransactionContext";
import { OpenContext } from "@/store/OpenContext";

// Components
import Calculator from "@/components/Calculator";
import TypeTabs from "@/components/Transaction/TypeTabs";
import TransactionForm from "@/components/Transaction/TransactionForm";
import SlidingPanel from "@/components/UI/SlidingPanel";
import Button from "@/components/UI/Button";
import InputError from "@/components/UI/InputError";

interface IProps {
	onSave(): void;
}

const TransactionPanel: FC<IProps> = ({ onSave }) => {
	console.log("re render TransactionPanel");

	// Store
	const { setCategoryMode, availableCategoryTypes } = useContext(SettingsContext);
	const {
		selectedTransaction,
		draftTransaction,
		error,
		updateDraftTransaction,
		saveDraftTransaction,
	} = useContext(TransactionContext);
	const { isOpen, toggleOpen } = useContext(OpenContext);

	// State
	const [selectedType, setSelectedType] = useState<CategoryType>(
		selectedTransaction?.type || "expense"
	);

	// Methods
	const handleTabClick = useCallback((type: CategoryType): void => {
		updateDraftTransaction({ type });

		// If the type changes, clear the current category
		updateDraftTransaction({ categoryId: "" });
		setSelectedType(type);
	}, []);

	const handleCalculatorChange = useCallback((amount: number): void => {
		updateDraftTransaction({ amount });
	}, []);

	const handleSave = useCallback(async (): Promise<void> => {
		const status: OperationStatus = await saveDraftTransaction();

		// If no errors, fire the function
		if (status.ok) {
			onSave();
		}
	}, []);

	useEffect(() => {
		// Change the display mode for the category
		setCategoryMode("panel");
	}, []);

	return (
		<>
			<section className="flex flex-col gap-0 h-[100%]">
				<TypeTabs
					items={availableCategoryTypes}
					activeTab={selectedType}
					onSelect={handleTabClick}
				/>
				<Calculator
					amount={draftTransaction?.amount || 0}
					onChange={handleCalculatorChange}
					additionalClasses=""
					displaySideButton
					onSideButtonClick={() => toggleOpen("transactionForm")}
				>
					<div className="bg-white">
						<Button onClick={() => toggleOpen("categorySelector")}>Category</Button>
					</div>
				</Calculator>

				{error && <InputError message={error} className="text-red-600" />}

				<Button
					className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
					onClick={handleSave}
				>
					Save
				</Button>
			</section>
			<SlidingPanel
				isOpen={isOpen("transactionForm")}
				onClose={() => toggleOpen("transactionForm")}
				slideDirection="from-right"
			>
				<TransactionForm onSave={() => toggleOpen("transactionForm")} />
			</SlidingPanel>
		</>
	);
};

export default TransactionPanel;
