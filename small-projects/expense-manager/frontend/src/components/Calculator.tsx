import React, { useState } from "react";

type Operation = "+" | "-" | "*" | "/";

const Calculator: React.FC = () => {
	const [currentInput, setCurrentInput] = useState("");
	const [previousInput, setPreviousInput] = useState("");
	const [operation, setOperation] = useState<Operation | null>(null);

	const handleNumberClick = (value: string) => {
		setCurrentInput(currentInput + value);
	};

	const handleOperationClick = (op: Operation) => {
		if (currentInput === "") return;
		setOperation(op);
		setPreviousInput(currentInput);
		setCurrentInput("");
	};

	const calculateResult = () => {
		if (operation && previousInput && currentInput) {
			const prev = parseFloat(previousInput);
			const current = parseFloat(currentInput);
			let result = 0;

			switch (operation) {
				case "+":
					result = prev + current;
					break;
				case "-":
					result = prev - current;
					break;
				case "*":
					result = prev * current;
					break;
				case "/":
					result = prev / current;
					break;
			}

			setCurrentInput(result.toString());
			setOperation(null);
			setPreviousInput("");
		}
	};

	const handleClear = () => {
		setCurrentInput("");
		setPreviousInput("");
		setOperation(null);
	};

	return (
		<div className="max-w-xs mx-auto mt-10 p-5 shadow-lg rounded-lg bg-gray-100">
			<div className="mb-5 p-3 bg-white rounded text-right font-mono text-2xl">
				{previousInput} {operation} <br />
				{currentInput || "0"}
			</div>
			<div className="grid grid-cols-4 gap-2">
				{"1234567890".split("").map((digit) => (
					<button
						key={digit}
						onClick={() => handleNumberClick(digit)}
						className="p-4 bg-blue-500 text-white font-semibold rounded shadow"
					>
						{digit}
					</button>
				))}
				<button
					onClick={() => handleOperationClick("+")}
					className="col-span-1 p-4 bg-green-500 text-white font-semibold rounded shadow"
				>
					+
				</button>
				<button
					onClick={() => handleOperationClick("-")}
					className="col-span-1 p-4 bg-green-500 text-white font-semibold rounded shadow"
				>
					-
				</button>
				<button
					onClick={() => handleOperationClick("*")}
					className="col-span-1 p-4 bg-green-500 text-white font-semibold rounded shadow"
				>
					*
				</button>
				<button
					onClick={() => handleOperationClick("/")}
					className="col-span-1 p-4 bg-green-500 text-white font-semibold rounded shadow"
				>
					/
				</button>
				<button
					onClick={calculateResult}
					className="col-span-2 p-4 bg-red-500 text-white font-semibold rounded shadow"
				>
					=
				</button>
				<button
					onClick={handleClear}
					className="col-span-2 p-4 bg-yellow-400 text-white font-semibold rounded shadow"
				>
					C
				</button>
			</div>
		</div>
	);
};

export default Calculator;
