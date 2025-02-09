import { useState, useRef } from "react";

export default function SearchableList({ items, children }) {
	const [searchTerm, setSearchTerm] = useState("");
	const lastChange = useRef("");

	const searchResults = items.filter((item) =>
		item.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	function handleChange(e) {
		if (lastChange.current) {
			clearTimeout(lastChange.current);
		}

		lastChange.value = setTimeout(() => {
			lastChange.current = null;
			setSearchTerm(e.target.value);
		}, 500);
	}

	return (
		<div className="searchable-list">
			<input type="search" placeholder="search" onChange={handleChange} />
			<ul>
				{searchResults.map((item, index) => (
					<li key={index}>{children(item)}</li>
				))}
			</ul>
		</div>
	);
}
