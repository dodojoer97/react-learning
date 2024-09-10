// React
import { useState, useEffect, useContext } from "react";
import type { FC, PropsWithChildren } from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faPlus, faMinus, IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Store
import { TransactionContext } from "@/store/TransactionContext";

type Operation = "+" | "-" | "*" | "/";

interface ICalculatorProps extends PropsWithChildren {
	amount: number;
	onChange(value: number): void;
	additionalClasses?: string;
	displaySideButton?: boolean;
	onSideButtonClick?(): void;
}

const Calculator: FC<ICalculatorProps> = ({
	amount,
	onChange,
	additionalClasses,
	children,
	displaySideButton,
	onSideButtonClick,
}) => {
	// Store
	const transactionCTX = useContext(TransactionContext);

	// State
	const [currentInput, setCurrentInput] = useState<string>(amount.toString());
	const [previousInput, setPreviousInput] = useState<string>("");
	const [operation, setOperation] = useState<Operation | null>(null);

	// Computed
	// TODO make global, to use in othe places
	const icon: IconDefinition =
		transactionCTX.draftTransaction?.type === "expense" ? faMinus : faPlus;
	// Methods
	const handleNumberClick = (value: string) => {
		// Prevent multiple decimal points in the same number
		if (value === "." && currentInput.includes(".")) {
			return;
		}
		if (currentInput !== "0") {
			setCurrentInput(currentInput + value);
		} else if (value !== ".") {
			setCurrentInput(value);
		} else {
			setCurrentInput(currentInput + value); // Allows "0."
		}
	};

	const performCalculation = (prev: number, current: number, op: Operation): number => {
		switch (op) {
			case "+":
				return prev + current;
			case "-":
				return prev - current;
			case "*":
				return prev * current;
			case "/":
				return prev / current;
		}
	};

	const handleOperationClick = (nextOperation: Operation) => {
		const current = parseFloat(currentInput);
		if (operation && previousInput !== "") {
			const prev = parseFloat(previousInput);
			const newResult = performCalculation(prev, current, operation);
			setPreviousInput(newResult.toString());
			setCurrentInput("0");
		} else {
			setPreviousInput(currentInput);
			setCurrentInput("0");
		}
		setOperation(nextOperation);
	};

	const calculateResult = () => {
		if (!operation || previousInput === "") return;
		const current = parseFloat(currentInput);
		const prev = parseFloat(previousInput);
		const result = performCalculation(prev, current, operation);
		setCurrentInput(result.toString());
		setOperation(null);
		setPreviousInput("");
	};

	const handleClear = () => {
		setCurrentInput("0");
		setPreviousInput("");
		setOperation(null);
	};

	// Emit the value to other components
	useEffect(() => {
		onChange(parseFloat(currentInput));
	}, [currentInput]);

	return (
		<div
			className={`p-6 h-[90%] shadow-lg rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col ${
				additionalClasses || ""
			}`}
		>
			{/* Display */}
			<div className="mb-5 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-right font-mono text-3xl flex-1 text-gray-900 dark:text-gray-100">
				<div className="flex h-full">
					<div className="flex flex-1 items-center space-x-2">
						<FontAwesomeIcon icon={icon} />
						<div>
							{previousInput} {operation}
						</div>
					</div>
					<div>{currentInput}</div>
					{displaySideButton && (
						<div className="px-3 border-l-2 flex items-center">
							<button
								onClick={onSideButtonClick}
								className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
							>
								<FontAwesomeIcon icon={faSliders} />
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Buttons */}
			<div className="grid grid-cols-4 gap-2 h-full">
				{["7", "8", "9", "+", "4", "5", "6", "*", "1", "2", "3", "-", "/"].map(
					(digitOrOp) => (
						<button
							key={digitOrOp}
							onClick={() =>
								digitOrOp in { "+": 1, "-": 1, "*": 1, "/": 1 }
									? handleOperationClick(digitOrOp as Operation)
									: handleNumberClick(digitOrOp)
							}
							className={`p-4 ${
								digitOrOp in { "+": 1, "-": 1, "*": 1, "/": 1 }
									? "bg-green-600 dark:bg-green-500"
									: "bg-blue-600 dark:bg-blue-500"
							} text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90`}
						>
							{digitOrOp}
						</button>
					)
				)}
				<button
					onClick={() => handleNumberClick("0")}
					className="col-span-1 p-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90"
				>
					0
				</button>
				<button
					onClick={() => handleNumberClick(".")}
					className="col-span-1 p-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90"
				>
					.
				</button>
				<button
					onClick={calculateResult}
					className="col-span-1 p-4 bg-red-600 dark:bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90"
				>
					=
				</button>
				<button
					onClick={handleClear}
					className="col-span-1 p-4 bg-yellow-500 dark:bg-yellow-400 text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90"
				>
					C
				</button>
			</div>
		</div>
	);
};

export default Calculator;
