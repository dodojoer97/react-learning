// React
import type { FC } from "react";

// Types
import { IGroupedItem, IGroupItem } from "@/utils/utils.d";

interface IDropdownProps<T extends IGroupItem> {
	data: IGroupedItem<IGroupItem>[];
	Component: FC<any>; // Using React.ComponentType to define the component prop
}

const Dropdown: FC<IDropdownProps<IGroupItem>> = ({ data, Component }) => {
	return <></>;
};

export default Dropdown;
