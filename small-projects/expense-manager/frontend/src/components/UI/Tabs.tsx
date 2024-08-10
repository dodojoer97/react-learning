import React, { FC } from "react";

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
	const groupedData = groupIntoTabs(data);

	return (
		<div>
			{groupedData.map((group, groupIndex) => (
				<div key={groupIndex}>
					<h2>{group.type}</h2> {/* Displaying the type as a header */}
					{group.values.map((item, index) => (
						<div key={index}>
							{item.type} <Component {...item} />{" "}
							{/* Correct usage of the component prop */}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Tabs;
