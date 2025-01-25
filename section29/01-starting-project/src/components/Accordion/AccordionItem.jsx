import { useAccordionContext } from "./Accordion";

export default function AccordionItem({ id, className, title, children }) {
	const { openItemId, toggleItem } = useAccordionContext();

	const isOpen = openItemId === id;

	function handleClick() {
		toggleItem(id);
	}

	return (
		<li className={className}>
			<h3 onClick={handleClick}>{title}</h3>

			<div className={`accordion-item-content ${isOpen ? "open" : undefined}`}>
				{children}
			</div>
		</li>
	);
}
