import { useState } from "react";
import type { FC } from "react";

// Components
import TabItem from "@/components/UI/TabItem";
import Dropdown from "@/components/UI/Dropdown";

// Utils
import { groupByType } from "@/utils/utils";
import { IGroupedItem, IGroupItem } from "@/utils/utils.d";

interface ITabsProps<T extends IGroupItem> {
	data: T[];
	Component: FC<any>; // Using React.ComponentType to define the component prop
}

const Tabs: FC<ITabsProps<IGroupItem>> = ({ data, Component }) => {
	// Data
	const groupedData: IGroupedItem<IGroupItem>[] = groupByType(data);

	// Set the first active tab as the first group
	const [activeTab, setActiveTab] = useState<string>(groupedData[0].type);

	const isActiveTab = (type: string): boolean => {
		return type === activeTab;
	};

	const handleTabClick = (type: string): void => {
		setActiveTab(type);
	};

	// TOdo move to hook
	const isMobile = false;

	return (
		<>
			{!isMobile && (
				<ul className="flex flex-wrap justify-evenly text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
					{groupedData.map((group, index) => (
						<TabItem
							key={`${group.type}-${index}`}
							name={group.type}
							isActive={isActiveTab(group.type)}
							onClick={() => handleTabClick(group.type)}
						>
							{group.values.map((item, index) => (
								<Component key={`${item.type}-${index}`} {...item} />
							))}
						</TabItem>
					))}
				</ul>
			)}
			{isMobile && <Dropdown items={["test", "test2"]} onSelect={() => {}} />}
		</>
	);
};

export default Tabs;
