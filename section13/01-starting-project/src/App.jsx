import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";

function App() {
	log("<App /> rendered");

	const [chosenCount, setChosenCount] = useState(0);

	function handleSetCount(newCount) {
		// Calling two state updating functions will not cause the component to run twice :)
		setChosenCount(newCount);
		setChosenCount((prevCount) => prevCount + 1);
		console.log(chosenCount); //wont work
	}

	return (
		<>
			<Header />
			<main>
				<ConfigureCounter onSet={handleSetCount} />
				<Counter key={chosenCount} initialCount={chosenCount} />
			</main>
		</>
	);
}

export default App;
