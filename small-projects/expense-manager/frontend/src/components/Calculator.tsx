// React
import { useState, useEffect } from "react";
import type { FC, PropsWithChildren } from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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
	const [currentInput, setCurrentInput] = useState<string>(amount.toString());
	const [previousInput, setPreviousInput] = useState<string>("");
	const [operation, setOperation] = useState<Operation | null>(null);

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
	}, [currentInput, onChange]);

	return (
		<div
			className={`p-5 h-[100%] shadow-lg rounded-lg bg-gray-100 flex flex-col ${
				additionalClasses || ""
			}`}
		>
			<div className="mb-5 p-3 bg-white rounded text-right font-mono text-2xl flex-1">
				<div className="flex h-[100%]">
					<div className="flex-1">
						{previousInput} {operation} <br />
						{currentInput}
					</div>
					{displaySideButton && (
						<div className="px-3 border-l-2 flex align-center">
							<button onClick={onSideButtonClick}>
								<FontAwesomeIcon icon={faArrowRightFromBracket} />
							</button>
						</div>
					)}
				</div>
			</div>
			<div>{children}</div>
			<div className="grid grid-cols-4 gap-2 h-[70%] flex-[2]">
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
									? "bg-green-500"
									: "bg-blue-500"
							} text-white font-semibold rounded shadow`}
						>
							{digitOrOp}
						</button>
					)
				)}
				<button
					onClick={() => handleNumberClick("0")}
					className="col-span-1 p-4 bg-blue-500 text-white font-semibold rounded shadow"
				>
					0
				</button>
				<button
					onClick={() => handleNumberClick(".")}
					className="col-span-1 p-4 bg-blue-500 text-white font-semibold rounded shadow"
				>
					.
				</button>
				<button
					onClick={calculateResult}
					className="col-span-1 p-4 bg-red-500 text-white font-semibold rounded shadow"
				>
					=
				</button>
				<button
					onClick={handleClear}
					className="col-span-1 p-4 bg-yellow-400 text-white font-semibold rounded shadow"
				>
					C
				</button>
			</div>
		</div>
	);
};

export default Calculator;