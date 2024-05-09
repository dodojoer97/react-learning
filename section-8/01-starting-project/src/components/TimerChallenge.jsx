import { useState, useRef } from "react";

// Components
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
	// Refs will not re render when state changes
	const timer = useRef();
	const dialog = useRef();
	const timeInSeconds = targetTime * 1000

	const [timeRemaining, setTimeRemaining] = useState(timeInSeconds)

	const timerIsActive = timeRemaining > 0 && timeRemaining < timeInSeconds
	
	if(timeRemaining <= 0) {
		clearInterval(timer.current);
		dialog.current.open()
	}

	function handleReset() {
		setTimeRemaining(timeInSeconds)
	}

	function handleStart() {
		timer.current = setInterval(() => {
			setTimeRemaining((currentTime) => {
				return currentTime -= 10
			})
		}, 10);
	}



	function handleStop() {
		dialog.current.open()
		clearInterval(timer.current);
	}

	return (
		<>
			<ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
			<section className="challenge">
				<h2>{title}</h2>
				<p className="challenge-time">
					{targetTime} second{targetTime > 1 ? "s" : ""}
				</p>
				<p>
					<button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? "Stop" : "Start"} Challenge</button>
				</p>
				<p className={timerIsActive ? "active" : undefined}>{timerIsActive ? "Time is running" : "Timer inactive"}</p>
			</section>
		</>
	);
}
