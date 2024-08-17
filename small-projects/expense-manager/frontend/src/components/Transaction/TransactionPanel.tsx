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

// Hooks
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";
import useIsOpen from "@/hooks/useIsOpen";

// Utils
import { hasMinValue, hasMinLength } from "@/utils/utils";

// Models
import { Transaction } from "@common";

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
	const { isOpen, toggleOpen } = useIsOpen();

	// Methods
	const handleTabClick = (type: CategoryType): void => {
		transactionCTX.updateDraftTransaction({ type });
		setSelectedType(type);
	};

	const handleCalculatorChange = (amount: number): void => {
		transactionCTX.updateDraftTransaction({ amount });
	};

	const handleToggle = (): void => {
		toggleOpen();
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
					amount={transactionCTX.draftTransaction?.amount || 0}
					onChange={handleCalculatorChange}
					additionalClasses=""
					displaySideButton
					onSideButtonClick={handleToggle}
				/>

				<SlidingPanel isOpen={isOpen} onClose={handleToggle} slideDirection="from-right">
					<TransactionForm onSave={handleToggle} />
				</SlidingPanel>
			</section>
		</>
	);
};

export default TransactionPanel;
