import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
	// useRef values do not change when the funtion re executes
	const shuffeldAnswers = useRef();

	if (!shuffeldAnswers.current) {
		shuffeldAnswers.current = answers;
		shuffeldAnswers.current.sort(() => Math.random() - 0.5);
	}

	console.log("shuffeldAnswers: ", shuffeldAnswers.current);
	return (
		<ul id="answers">
			{shuffeldAnswers.current.map((answer) => {
				const isSelected = answer === selectedAnswer;

				let cssClass = "";
				if (answerState === "answered" && isSelected) {
					cssClass = "selected";
				}

				if ((answerState === "correct" || answerState === "wrong") && isSelected) {
					cssClass = answerState;
				}

				return (
					<li key={answer} className="answer">
						<button onClick={() => onSelect(answer)} className={cssClass}>
							{answer}
						</button>
					</li>
				);
			})}
		</ul>
	);
}
