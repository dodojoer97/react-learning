import { useState, useContext, useMemo } from "react";
import type { FC } from "react";

// Components
import TabItem from "@/components/UI/TabItem";
import Dropdown from "@/components/UI/Dropdown";

// Utils
import { groupByType } from "@/utils/utils";
import { IGroupedItem, IGroupItem } from "@/utils/utils.d";

// Hooks
import useIsMobile from "@/hooks/useIsMobile";
import Card from "./Card";

// Models
import SelectFieldOption from "@/models/SelectFieldOption";
import { Category } from "../../../../common/src";

interface ITabsProps<T extends IGroupItem> {
	data: T[];
	Component: FC<any>; // Using React.ComponentType to define the component prop
}

const Tabs: FC<ITabsProps<Category>> = ({ data, Component }) => {
	// Hooks
	const isMobile = useIsMobile();

	// Data
	const groupedData: IGroupedItem<Category>[] = groupByType(data);

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
			{!isMobile && (
				<ul className="flex flex-wrap justify-evenly text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
					{groupedData.map((group, index) => (
						<TabItem
							key={`${group.type}-${index}`}
							name={group.type}
							isActive={isActiveTab(group.type)}
							onClick={() => handleTabClick(group.type)}
						>
							<Card className="mt-2">
								{group.values.map((item, index) => (
									<Component key={`${item.type}-${index}`} {...item} />
								))}
							</Card>
						</TabItem>
					))}
				</ul>
			)}
			{isMobile && (
				<>
					<Dropdown
						id={`drodown-${groupedData[0].type}`}
						items={groupedData.map(
							(group) => new SelectFieldOption(group.type, group.type)
						)}
						onSelect={(option) => handleTabClick(option.value)}
					/>
					<Card className="mt-2">
						{groupedData.map(
							(group) =>
								isActiveTab(group.type) &&
								group.values.map((item, index) => (
									<Component key={`${item.type}-${index}`} {...item} />
								))
						)}
					</Card>
				</>
			)}
		</>
	);
};

export default Tabs;
