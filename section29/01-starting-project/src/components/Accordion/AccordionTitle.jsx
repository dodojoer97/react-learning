import { useAccordionContext } from "./Accordion";

import { useAccordionItemContext } from "./AccordionItem";
export default function AccordionTitle({ children, className }) {
	const { toggleItem } = useAccordionContext();

	const id = useAccordionItemContext();

	return (
		<h3 onClick={() => toggleItem(id)} className={className}>
			{children}
		</h3>
	);
}
