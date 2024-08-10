// React
import type { FC } from "react";

// Types
import { IGroupedItem, IGroupItem } from "@/utils/utils.d";

interface IDropdownProps {
	items: string[],
    onSelect(item: string): void
}

const Dropdown: FC<IDropdownProps> = ({ items, onSelect }) => {
	return <div className="dropdown-menu">
        {items.forEach(item) => }

    </div>;- 
};

export default Dropdown;
