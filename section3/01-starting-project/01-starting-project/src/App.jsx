// Components
import Header from "./components/Header";
import CoreConcept from "./components/CoreConcept";
import TabButton from "./components/TabButton";

// Data
import { CORE_CONCEPTS } from "./data";

function App() {
	let tabContent = "Please click a button";
	function handleSelect(selectedButton) {
		tabContent = selectedButton;
	}

	return (
		<div>
			<Header />
			<main>
				<section id="core-concepts">
					<h2>Core concepts</h2>
					<ul>
						{CORE_CONCEPTS.map((concept) => {
							return <CoreConcept title={concept.title} img={concept.image} description={concept.description} key={concept.id} />;
						})}
					</ul>
				</section>
				<section id="examples">
					<h2>Examples</h2>
					<menu>
						<TabButton onSelect={() => handleSelect("components")}>Components</TabButton>
						<TabButton onSelect={() => handleSelect("jsx")}>JSX</TabButton>
						<TabButton onSelect={() => handleSelect("props")}>Props</TabButton>
						<TabButton onSelect={() => handleSelect("state")}>State</TabButton>
					</menu>
					{tabContent}
				</section>
			</main>
		</div>
	);
}

export default App;
