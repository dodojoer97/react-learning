import type { FC } from "react";
import { useState, useEffect, useCallback } from "react";

// Types
import type { CategoryType, OperationStatus } from "@common";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Correct store import
import { setCategoryMode } from "@/store/settingsSlice"; // Action from settings slice
import { updateDraftTransaction, saveDraftTransaction } from "@/store/transactionSlice"; // Actions from transaction slice
import { toggleOpen } from "@/store/openSlice"; // Action from open slice

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
	console.log("re-render TransactionPanel");

	// Redux
	const dispatch = useDispatch<AppDispatch>();
	const { availableCategoryTypes } = useSelector((state: RootState) => state.settings);
	const { selectedTransaction, draftTransaction, error } = useSelector(
		(state: RootState) => state.transaction
	);
	const { openSet } = useSelector((state: RootState) => state.open);

	// State
	const [selectedType, setSelectedType] = useState<CategoryType>(
		selectedTransaction?.type || "expense"
	);

	// Methods
	const handleTabClick = useCallback(
		(type: CategoryType): void => {
			dispatch(updateDraftTransaction({ type }));

			// If the type changes, clear the current category
			dispatch(updateDraftTransaction({ categoryId: "" }));
			setSelectedType(type);
		},
		[dispatch]
	);

	const handleCalculatorChange = useCallback(
		(amount: number): void => {
			dispatch(updateDraftTransaction({ amount }));
		},
		[dispatch]
	);

	const handleSave = useCallback(async (): Promise<void> => {
		try {
			const status: OperationStatus = await dispatch(saveDraftTransaction()).unwrap();

			// If no errors, trigger the onSave callback
			if (status.ok) {
				onSave();
			}
		} catch (err) {
			console.error("Failed to save the draft transaction:", err);
		}
	}, [dispatch, onSave]);

	useEffect(() => {
		// Change the display mode for the category
		dispatch(setCategoryMode("panel"));
	}, [dispatch]);

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
					onSideButtonClick={() => dispatch(toggleOpen("transactionForm"))}
				>
					<div className="bg-white">
						<Button onClick={() => dispatch(toggleOpen("categorySelector"))}>
							Category
						</Button>
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
				isOpen={openSet.includes("transactionForm")} // Use openSet from Redux to check if the panel is open
				onClose={() => dispatch(toggleOpen("transactionForm"))}
				slideDirection="from-right"
			>
				<TransactionForm onSave={() => dispatch(toggleOpen("transactionForm"))} />
			</SlidingPanel>
		</>
	);
};

export default TransactionPanel;
