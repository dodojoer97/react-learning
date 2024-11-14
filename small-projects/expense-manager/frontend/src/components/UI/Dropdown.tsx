// React
import { useState, useRef, useEffect } from "react";
import type { FC } from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Transition from "@/templates/mosaic/utils/Transition";
import type SelectFieldOption from "@/models/SelectFieldOption";

interface IDropdownProps {
	items: SelectFieldOption<string>[];
	onSelect(item: SelectFieldOption<string>): void;
	id: string;
	selectedItem?: SelectFieldOption<string>;
	label?: string;
}

const Dropdown: FC<IDropdownProps> = ({ items, onSelect, id, label, selectedItem }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentlySelectedItem, setCurrentlySelectedItem] = useState(selectedItem || items[0]);

	const trigger = useRef<HTMLButtonElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

	const handleSelect = (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
		item: SelectFieldOption<string>
	): void => {
		event.stopPropagation(); // Stop event from bubbling to parent
		onSelect(item);
		setCurrentlySelectedItem(item);
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
			<label className="block text-sm font-medium mb-1" htmlFor={id}>
				{label}
			</label>
			<div className="relative inline-flex w-full">
				<button
					ref={trigger}
					className="btn w-full justify-between min-w-44 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
					aria-label="Select date range"
					aria-haspopup="true"
					onClick={handleToggle}
					aria-expanded={isOpen}
					type="button"
				>
					<span className="flex items-center">
						<span>{currentlySelectedItem.label}</span>
					</span>
					<svg
						className="shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500"
						width="11"
						height="7"
						viewBox="0 0 11 7"
					>
						<path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
					</svg>
				</button>
				<Transition
					show={isOpen}
					tag="div"
					className="z-10 absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
					enter="transition ease-out duration-100 transform"
					enterStart="opacity-0 -translate-y-2"
					enterEnd="opacity-100 translate-y-0"
					leave="transition ease-out duration-100"
					leaveStart="opacity-100"
					leaveEnd="opacity-0"
				>
					<div
						ref={dropdownRef}
						className="font-medium text-sm text-gray-600 dark:text-gray-300 divide-y divide-gray-200 dark:divide-gray-700/60"
						onFocus={() => setIsOpen(true)}
						onBlur={() => setIsOpen(false)}
					>
						{items.map((item: SelectFieldOption<string>, index: number) => {
							return (
								<button
									key={`${item}-${index}`}
									tabIndex={0}
									className={`flex items-center justify-between w-full hover:bg-gray-50 dark:hover:bg-gray-700/20 py-2 px-3 cursor-pointer ${
										item.value === currentlySelectedItem.value &&
										"text-violet-500"
									}`}
									onClick={(e) => handleSelect(e, item)}
									type="button"
								>
									<span>{item.label}</span>
									<svg
										className={`shrink-0 mr-2 fill-current text-violet-500 ${
											item.value !== currentlySelectedItem.value &&
											"invisible"
										}`}
										width="12"
										height="9"
										viewBox="0 0 12 9"
									>
										<path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
									</svg>
								</button>
							);
						})}
					</div>
				</Transition>
			</div>
		</>
	);
};

export default Dropdown;
