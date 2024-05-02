export default function CoreConcept(props) {
	return (
		<li>
			<img src={props.image} alt="some alt" />
			<h3>{props.title}</h3>
			<p>{props.description}</p>
		</li>
	);
}
