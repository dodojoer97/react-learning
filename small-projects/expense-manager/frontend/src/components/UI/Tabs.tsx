import { useState } from "react";
import type { FC } from "react";

// Components
import Tab from "@/components/UI/Tab";

interface ITabItem {
	type: string;
	// Additional properties can be defined here
}

interface IGroupedTabItem<T extends ITabItem> {
	type: string;
	values: T[];
}

interface ITabsProps<T extends ITabItem> {
	data: T[];
	Component: FC<any>; // Using React.ComponentType to define the component prop
}

const groupIntoTabs = <T extends ITabItem>(data: T[]): IGroupedTabItem<T>[] => {
	const groups: Record<string, T[]> = {};

	// Grouping items by their type
	data.forEach((item) => {
		if (!groups[item.type]) {
			groups[item.type] = [];
		}
		groups[item.type].push(item);
	});

	// Converting groups into the desired array format
	return Object.keys(groups).map((type) => ({
		type: type,
		values: groups[type],
	}));
};

const Tabs: FC<ITabsProps<ITabItem>> = ({ data, Component }) => {
	// Data
	const groupedData = groupIntoTabs(data);

	// Set the first active tab as the first group
	const [activeTab, setActiveTab] = useState<string>(groupedData[0].type);

	const isActiveTab = (type: string): boolean => {
		return type === activeTab;
	};

	const handleTabClick = (type: string): void => {
		setActiveTab(type);
	};

	return (
		<>
			{groupedData.length && (
				<ul className="flex flex-wrap justify-evenly text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
					{groupedData.map((group) => (
						<>
							<Tab
								key={group.type}
								name={group.type}
								isActive={isActiveTab(group.type)}
								onClick={() => handleTabClick(group.type)}
							>
								{group.values.map((item, index) => (
									<Component key={index} {...item} />
								))}
							</Tab>
						</>
					))}
				</ul>
			)}
		</>
	);
};

export default Tabs;
