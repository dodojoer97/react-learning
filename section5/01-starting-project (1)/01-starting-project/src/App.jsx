import { useState } from "react";

// Components
import Header from "./components/Header";
import UserInput from "./components/UserInput";

function App() {
	const [userInput, setUserInput] = useState({
		initialInvestment: 1000,
		annualInvestment: 1200,
		expectedReturn: 6,
		duration: 10,
	});

	function handleChange(inputIdentifier, newValue) {
		setUserInput((prevUserInput) => {
			return {
				...prevUserInput,
				[inputIdentifier]: +newValue,
			};
		});
	}

	return (
		<>
			<Header />
			<main>
				<UserInput userInput={userInput} onChange={handleChange} />
			</main>
		</>
	);
}

export default App;
