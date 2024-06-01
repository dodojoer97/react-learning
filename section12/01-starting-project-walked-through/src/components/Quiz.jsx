import { useState } from "react";

// Data
import QUESTIONS from "../data/questions";

export default function Quiz() {
	const [userAnswers, setUserAnswers] = useState([]);

	// Derive instead of using state
	const activeQuestionIndex = userAnswers.length;

	function handleSelectAnswer(selectedAnswer) {
		setUserAnswers((currentAswers) => [...currentAswers, selectedAnswer]);
	}

	return (
		<div id="question">
			<h2>{QUESTIONS[activeQuestionIndex].text}</h2>
			<ul id="answers">
				{QUESTIONS[activeQuestionIndex].answers.map((answer) => (
					<li key={answer} className="answer">
						<button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
					</li>
				))}
			</ul>
		</div>
	);
}
