// React
import type { FC } from "react";
import { useState, useContext } from "react";

// Types
import type { CategoryType } from "@common";

// Store
import { SettingsContext } from "@/store/SettingsContext";
import { TransactionContext } from "@/store/TransactionContext";

// Copmonents
import Calculator from "@/components/Calculator";
import TypeTabs from "@/components/Transaction/TypeTabs";
import TransactionForm from "@/components/Transaction/TransactionForm";
import SlidingPanel from "@/components/UI/SlidingPanel";
import CategoryList from "@/components/Transaction/CategoryList";

// Hooks
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";
import useIsOpen from "@/hooks/useIsOpen";

// Utils
import { hasMinValue, hasMinLength } from "@/utils/utils";

// Models
import { Transaction } from "@common";
import Button from "../UI/Button";

interface IProps {
	onSave(): void;
}

const TransactionPanel: FC<IProps> = ({ onSave }) => {
	// TODO add translations
	// Store
	const settingsCTX = useContext(SettingsContext);
	const transactionCTX = useContext(TransactionContext);

	// State
	const [selectedType, setSelectedType] = useState<CategoryType>(
		transactionCTX.selectedTransaction?.type || "expense"
	);

	// Hooks
	const { isOpen: isTransactionFormOpen, toggleOpen: toggleTransactionFormOpen } =
		useIsOpen(true);
	const { isOpen: isCategorySelectorOpen, toggleOpen: toggleCategorySelectorOpen } =
		useIsOpen(true);

	// Methods
	const handleTabClick = (type: CategoryType): void => {
		transactionCTX.updateDraftTransaction({ type });
		setSelectedType(type);
	};

	const handleCalculatorChange = (amount: number): void => {
		transactionCTX.updateDraftTransaction({ amount });
	};

	// Change the display mode for the category
	settingsCTX.setCategoryMode("panel");

	return (
		<>
			<section className="flex flex-col gap-0 h-[100%]">
				<TypeTabs
					items={settingsCTX.availableCategoryTypes}
					activeTab={selectedType}
					onSelect={handleTabClick}
				/>
				<Calculator
					amount={transactionCTX.draftTransaction?.amount || 0}
					onChange={handleCalculatorChange}
					additionalClasses=""
					displaySideButton
					onSideButtonClick={toggleTransactionFormOpen}
				>
					<div className="bg-white">
						<Button onClick={toggleCategorySelectorOpen}>Category</Button>
					</div>
				</Calculator>

				<SlidingPanel
					isOpen={isTransactionFormOpen}
					onClose={toggleTransactionFormOpen}
					slideDirection="from-right"
				>
					<TransactionForm onSave={toggleTransactionFormOpen} />
				</SlidingPanel>
			</section>
			<SlidingPanel
				isOpen={isCategorySelectorOpen}
				onClose={toggleCategorySelectorOpen}
				slideDirection="from-right"
			>
				<CategoryList onSelect={toggleCategorySelectorOpen} />
			</SlidingPanel>
		</>
	);
};

export default TransactionPanel;
