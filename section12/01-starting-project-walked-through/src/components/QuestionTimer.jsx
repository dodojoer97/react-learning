import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
	const [remainingTime, setRemainingTime] = useState(timeout);

	useEffect(() => {
		console.log("SETTING TIMEOUT");
		const timer = setTimeout(onTimeout, timeout);

		// Prevent the setting of two timeouts
		return () => {
			clearTimeout(timer);
		};
	}, [timeout, onTimeout]);

	// Will create an infanent loop, because it will update the state causing the component to re-render
	useEffect(() => {
		console.log("SETTING INTERVAL");
		const interval = setInterval(() => {
			setRemainingTime((prevTime) => prevTime - 100);
		}, 100);

		// Prevent the setting of two intervals
		return () => {
			clearInterval(interval);
		};
	}, []);

	return <progress id="question-time" max={timeout} value={remainingTime} />;
}
