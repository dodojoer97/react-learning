// React
import { useState } from "react";

// Components
import Header from "./components/Header";
import CoreConcept from "./components/CoreConcept";
import TabButton from "./components/TabButton";

// Data
import { EXAMPLES, CORE_CONCEPTS } from "./data";

function App() {
	const [selectedTopic, setSelectedTopic] = useState("")

	function handleSelect(selectedButton) {
		setSelectedTopic(selectedButton)
	}

	let tabContent = <p>Please select a topic</p>

	if(selectedTopic) {
		tabContent = (
				<div id="tab-content">
					<h3>{EXAMPLES[selectedTopic].title}</h3>
					<p>{EXAMPLES[selectedTopic].description}</p>
					<pre>
						<code>{EXAMPLES[selectedTopic].code}</code>
					</pre>
				</div>
			)
		
	}

	function checkIsSelected(selectedButton) {
		return selectedTopic === selectedButton
	}

	return (
		<div>
			<Header />
			<main>
				<section id="core-concepts">
					<h2>Core concepts</h2>
					<ul>
						{CORE_CONCEPTS.map((concept) => {
							return <CoreConcept key={concept.id} {...concept} />;
						})}
					</ul>
				</section>
				<section id="examples">
					<h2>Examples</h2>
					<menu>
						<TabButton onSelect={() => handleSelect("components")} isSelected={checkIsSelected('components')}>Components</TabButton>
						<TabButton onSelect={() => handleSelect("jsx")} isSelected={checkIsSelected('jsx')}>JSX</TabButton>
						<TabButton onSelect={() => handleSelect("props")} isSelected={checkIsSelected('props')}>Props</TabButton>
						<TabButton onSelect={() => handleSelect("state")} isSelected={checkIsSelected('state')}>State</TabButton>
					</menu>
					{tabContent}
				</section>
			</main>
		</div>
	);
}

export default App;
