// React
import { useState, useRef, useEffect } from "react";
import type { FC } from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface IDropdownProps {
	items: string[];
	onSelect(item: string): void;
	id: string;
	label?: string;
}

const Dropdown: FC<IDropdownProps> = ({ items, onSelect, id, label }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(items[0]);
	const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

	const handleSelect = (
		item: string,
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	): void => {
		event.stopPropagation(); // Stop event from bubbling to parent
		onSelect(item);
		setSelectedItem(item);
		setIsOpen(false); // Close dropdown
	};

	const handleToggle = (): void => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	// Event handler to close dropdown if clicked outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []); // Empty dependency array ensures this only runs on mount and unmount

	return (
		<>
			<label htmlFor={id}>{label}</label>
			<div
				ref={dropdownRef}
				className="relative cursor-pointer bg-white text-gray-800"
				onClick={handleToggle}
			>
				<div className="p-4 flex justify-between items-center">
					<span>{selectedItem}</span>
					<FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
				</div>
				<div
					className={`absolute top-full left-0 z-10 w-full shadow-md max-h-60 overflow-auto bg-white border-t-2 ${
						isOpen ? "block" : "hidden"
					}`}
				>
					{items.map((item, index) => (
						<div
							key={`${item}-${index}`}
							onClick={(event) => handleSelect(item, event)}
							className="text-sm py-2 px-4 hover:bg-gray-100 cursor-pointer"
						>
							{item}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Dropdown;
