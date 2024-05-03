import headerImage from "../assets/investment-calculator-logo.png";

function Header() {
	return (
		<header id="header">
			<h1>Investment calculator</h1>
			<img src={headerImage} alt="Investment calculator image" />
		</header>
	);
}

export default Header;
