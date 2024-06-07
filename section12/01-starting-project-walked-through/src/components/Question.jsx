import { useState } from "react";

// Components
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

// Data
import QUESTIONS from "../data/questions";

export default function Question({ questionIndex, onSelect, onSkip }) {
	const [answer, setAnswer] = useState({
		selectedAnswer: "",
		isCorrect: null,
	});

	function handleSelectAnswer(answer) {
		setAnswer({
			selectedAnswer: answer,
			isCorrect: null,
		});

		setTimeout(() => {
			setAnswer({
				selectedAnswer: answer,
				isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
			});

			setTimeout(() => {
				onSelect(answer);
			}, 2000);
		}, 1000);
	}

	let answerState = "";

	if (answer.selectedAnswer && answer.isCorrect !== null) {
		answerState = answer.isCorrect ? "correct" : "wrong";
	} else if (answer.selectedAnswer) {
		answerState = "answered";
	}

	return (
		<>
			<QuestionTimer timeout={10000} onTimeout={onSkip} />
			<h2>{QUESTIONS[questionIndex].text}</h2>
			<Answers answers={QUESTIONS[questionIndex].answers} selectedAnswer={answer.selectedAnswer} answerState={answerState} onSelect={handleSelectAnswer} />
		</>
	);
}
