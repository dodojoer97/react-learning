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
import CategoryList from "@/components/Category/CategoryList";
import Toast from "../UI/Toast";
import { clearError } from "@/store/transactionSlice";

interface IProps {
	onSave(): void;
}

const TransactionPanel: FC<IProps> = ({ onSave }) => {
	// Redux
	const dispatch = useDispatch<AppDispatch>();
	const { availableCategoryTypes, selectedTransaction, draftTransaction, error, loading } =
		useSelector((state: RootState) => ({
			availableCategoryTypes: state.settings.availableCategoryTypes,
			selectedTransaction: state.transaction.selectedTransaction,
			draftTransaction: state.transaction.draftTransaction,
			error: state.transaction.error,
			loading: state.transaction.loading,
		}));

	const { openSet } = useSelector((state: RootState) => state.open);

	// State
	const [selectedType, setSelectedType] = useState<CategoryType>(
		selectedTransaction?.type || "expense"
	);

	// Computed
	const isErrorToastOpen = !!error;

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
			if (new Date(draftTransaction?.date as string).getTime() > new Date().getTime()) {
				const test: boolean = confirm("TEST");
				if (test && draftTransaction) {
					draftTransaction.status = "planned";
					await dispatch(saveDraftTransaction()).unwrap();
					// If no errors, trigger the onSave callback
					onSave();
				} else {
					return;
				}
			}
			await dispatch(saveDraftTransaction()).unwrap();

			// If no errors, trigger the onSave callback
			onSave();
		} catch (err) {
			console.error("Failed to save the draft transaction:", err);
		}
	}, [dispatch, onSave]);

	const handleClose = (): void => {
		dispatch(clearError());
	};

	useEffect(() => {
		// Change the display mode for the category
		dispatch(setCategoryMode("panel"));
	}, [dispatch]);

	return (
		<>
			<section className="flex flex-col gap-0 h-[100%] relative">
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
					<div className="p-5 flex justify-center">
						<Button
							className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
							onClick={() => dispatch(toggleOpen("categorySelector"))}
						>
							Choose Category
						</Button>
					</div>
				</Calculator>

				<Button
					className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
					onClick={handleSave}
					loading={loading}
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
			<SlidingPanel
				isOpen={openSet.includes("categorySelector")} // Use openSet from Redux to check if the panel is open
				onClose={() => dispatch(toggleOpen("categorySelector"))}
				slideDirection="from-right"
			>
				<CategoryList onSelect={() => dispatch(toggleOpen("categorySelector"))} />
			</SlidingPanel>
			<Toast isOpen={isErrorToastOpen} type="error" onClose={handleClose}>
				<p>{error}</p>
			</Toast>
		</>
	);
};

export default TransactionPanel;
