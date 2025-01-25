import Accordion from "./components/Accordion/Accordion";

function App() {
	return (
		<main>
			<section>
				<h2>Why work with us?</h2>
				<Accordion className="accordion">
					<Accordion.Item title="We got 20 years" id={1}>
						<article>
							<p>You can't ....</p>
							<p>Lorem.</p>
						</article>
					</Accordion.Item>
					<Accordion.Item title="blablabla" id={2}>
						<article>
							<p>Lorem, ipsum.</p>
							<p>Lorem.</p>
						</article>
					</Accordion.Item>
				</Accordion>
			</section>
		</main>
	);
}

export default App;
