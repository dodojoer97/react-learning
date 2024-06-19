import { useState, useCallback, useRef } from "react";

// Data
import QUESTIONS from "../data/questions";

// Components
import Question from "./Question.jsx";

export default function Quiz() {
	const [userAnswers, setUserAnswers] = useState([]);

	// Derive instead of using state
	const activeQuestionIndex = userAnswers.length;

	const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
		setUserAnswers((currentAswers) => [...currentAswers, selectedAnswer]);
	}, []);

	const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

	return (
		<div id="quiz">
			<div id="question">
				<Question questionIndex={activeQuestionIndex} onSelect={handleSelectAnswer} onSkip={handleSkipAnswer} />
			</div>
		</div>
	);
}
