import Accordion from "./components/Accordion/Accordion";

function App() {
	return (
		<main>
			<section>
				<h2>Why work with us?</h2>
				<Accordion className={"accordion"}>
					<Accordion.Item id="experience" className="accordion-item">
						<Accordion.Title className="accordion-item-title">
							Lorem, ipsum dolor.
						</Accordion.Title>
						<Accordion.Content className="accordion-item-content">
							<article>
								<p>You can't ....</p>
								<p>Lorem.</p>
							</article>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item id="experience2" className="accordion-item">
						<Accordion.Title className="accordion-item-title">
							Lorem, ipsum dolor.
						</Accordion.Title>
						<Accordion.Content className="accordion-item-content">
							<article>
								<p>You can't ....</p>
								<p>Lorem.</p>
							</article>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion>
			</section>
		</main>
	);
}

export default App;
