import quizImage from "../assets/quiz-logo.png";

export default function Header() {
	return (
		<header>
			<img src={quizImage} alt="Quiz image" />
			<h1>ReactQuiz</h1>
		</header>
	);
}
