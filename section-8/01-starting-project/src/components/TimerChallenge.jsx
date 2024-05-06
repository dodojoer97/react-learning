import { useState, useRef } from "react";

// Components
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
	// Refs will not re render when state changes
	const timer = useRef();
	const dialog = useRef();

	const [timerStarted, setTimerStarted] = useState(false);
	const [timerExpired, setTimerExpired] = useState(false);

	function handleStart() {
		setTimerStarted(true);

		timer.current = setTimeout(() => {
			setTimerExpired(true);
			// exposed by useImperativeHandle
			dialog.current.open();
		}, targetTime * 1000);
	}

	function handleStop() {
		clearTimeout(timer.current);
	}

	return (
		<>
			<ResultModal ref={dialog} result="Lost" targetTime={targetTime} open={timerExpired} />
			<section className="challenge">
				<h2>{title}</h2>
				<p className="challenge-time">
					{targetTime} second{targetTime > 1 ? "s" : ""}
				</p>
				<p>
					<button onClick={timerStarted ? handleStop : handleStart}>{timerStarted ? "Stop" : "Start"} Challenge</button>
				</p>
				<p className={timerStarted ? "active" : undefined}>{timerStarted ? "Time is running" : "Timer inactive"}</p>
			</section>
		</>
	);
}
