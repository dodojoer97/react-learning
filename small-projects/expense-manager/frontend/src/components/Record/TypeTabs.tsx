// React
import type { FC } from "react";

// Models
import SelectFieldOption from "@/models/SelectFieldOption";

// Types
import { CategoryType } from "@common";

// Components
import TabItem from "@/components/UI/TabItem";

interface ITypeSelectProps {
	items: SelectFieldOption[];
	activeTab: CategoryType;
	onSelect(value: CategoryType): void;
}

const TypeTabs: FC<ITypeSelectProps> = ({ items, activeTab, onSelect }) => {
	return (
		<>
			<ul className="flex flex-wrap justify-evenly text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
				{items.map((item, index) => (
					<TabItem
						key={`${item.value}-${index}`}
						name={item.value}
						isActive={activeTab === item.value}
						onClick={() => onSelect(item.value as CategoryType)}
						className="bg-blue-400 p-3 text-white flex-1 border-b-0"
						displaySelected={false}
					>
						{item.value}
					</TabItem>
				))}
			</ul>
		</>
	);
};

export default TypeTabs;
