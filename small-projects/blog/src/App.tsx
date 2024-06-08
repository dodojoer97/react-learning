import { useState } from "react";

// Components
import Header from "@/components/Header";

// CSS
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Header />
		</>
	);
}

export default App;
