import { useState, useRef } from "react";

// The component will not re render when refs change, unlike state
export default function Player() {
	const playerName = useRef();

	const [enteredPlayerName, setEnteredPlayerName] = useState("");

	function handleClick() {
		setEnteredPlayerName(playerName.current.value);
	}

	return (
		<section id="player">
			<h2>Welcome {enteredPlayerName || "unknown entity"}</h2>
			<p>
				<input ref={playerName} type="text" />
				<button onClick={handleClick}>Set Name</button>
			</p>
		</section>
	);
}
