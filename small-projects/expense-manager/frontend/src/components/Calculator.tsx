// React
import { useState, useEffect } from "react";
import type { FC, PropsWithChildren } from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faPlus, faMinus, IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Import from Redux store
import Button from "./UI/Button";

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
	// Redux store
	const { draftTransaction } = useSelector((state: RootState) => state.transaction); // Access draftTransaction from Redux

	// State
	const [currentInput, setCurrentInput] = useState<string>(amount.toString());
	const [previousInput, setPreviousInput] = useState<string>("");
	const [operation, setOperation] = useState<Operation | null>(null);

	// Computed
	const icon: IconDefinition = draftTransaction?.type === "expense" ? faMinus : faPlus;

	// Methods
	const handleNumberClick = (value: string) => {
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

	const handleBackspace = () => {
		setCurrentInput(currentInput.slice(0, -1) || "0");
	};

	// Emit the value to other components
	useEffect(() => {
		// Emit the current input as a number to the parent component
		onChange(parseFloat(currentInput));
	}, [currentInput, onChange]);

	return (
		<div
			className={`p-6 h-[90%] shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col ${
				additionalClasses || ""
			}`}
		>
			{/* Display */}
			<div className="mb-5 p-4 bg-gray-100 dark:bg-gray-900 text-right font-mono text-3xl flex-1 text-gray-900 dark:text-gray-100">
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
							<Button
								onClick={onSideButtonClick}
								className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
							>
								<FontAwesomeIcon icon={faSliders} />
							</Button>
						</div>
					)}
				</div>
			</div>

			{children}

			{/* Buttons */}
			<div className="grid grid-cols-4 gap-2 h-full">
				{/* First row */}
				<Button className="p-4 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-sm shadow-lg">
					%
				</Button>
				<Button
					onClick={handleClear}
					className="p-4 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-sm shadow-lg"
				>
					C
				</Button>
				<Button
					onClick={handleBackspace}
					className="p-4 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-sm shadow-lg"
				>
					⌫
				</Button>
				<Button
					onClick={() => handleOperationClick("/")}
					className="p-4 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-sm shadow-lg"
				>
					÷
				</Button>

				{/* Second row */}
				<Button
					onClick={() => handleNumberClick("7")}
					className="p-4 bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-semibold rounded-sm shadow-lg"
				>
					7
				</Button>
				<Button
					onClick={() => handleNumberClick("8")}
					className="p-4 bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-semibold rounded-sm shadow-lg"
				>
					8
				</Button>
				<Button
					onClick={() => handleNumberClick("9")}
					className="p-4 bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-semibold rounded-sm shadow-lg"
				>
					9
				</Button>
				<Button
					onClick={() => handleOperationClick("*")}
					className="p-4 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-sm shadow-lg"
				>
					×
				</Button>

				{/* Third row */}
				<Button
					onClick={() => handleNumberClick("4")}
					className="p-4 bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-semibold rounded-sm shadow-lg"
				>
					4
				</Button>
				<Button
					onClick={() => handleNumberClick("5")}
					className="p-4 bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-semibold rounded-sm shadow-lg"
				>
					5
				</Button>
				<Button
					onClick={() => handleNumberClick("6")}
					className="p-4 bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-semibold rounded-sm shadow-lg"
				>
					6
				</Button>
				<Button
					onClick={() => handleOperationClick("-")}
					className="p-4 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-sm shadow-lg"
				>
					−
				</Button>

				{/* Fourth row */}
				<Button
					onClick={() => handleNumberClick("1")}
					className="p-4 bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-semibold rounded-sm shadow-lg"
				>
					1
				</Button>
				<Button
					onClick={() => handleNumberClick("2")}
					className="p-4 bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-semibold rounded-sm shadow-lg"
				>
					2
				</Button>
				<Button
					onClick={() => handleNumberClick("3")}
					className="p-4 bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-semibold rounded-sm shadow-lg"
				>
					3
				</Button>
				<Button
					onClick={() => handleOperationClick("+")}
					className="p-4 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-sm shadow-lg"
				>
					+
				</Button>

				{/* Fifth row */}
				<Button
					onClick={() => handleNumberClick("0")}
					className="p-4 bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-semibold rounded-sm shadow-lg col-span-2"
				>
					0
				</Button>
				<Button
					onClick={() => handleNumberClick(".")}
					className="p-4 bg-gray-100 dark:bg-gray-600 text-black dark:text-white font-semibold rounded-sm shadow-lg"
				>
					.
				</Button>
				<Button
					onClick={calculateResult}
					className="p-4 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-sm shadow-lg"
				>
					=
				</Button>
			</div>
		</div>
	);
};

export default Calculator;
