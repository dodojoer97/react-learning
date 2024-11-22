import { useState, useContext, useMemo } from "react";
import type { FC } from "react";

// Components
import Dropdown from "@/components/UI/Dropdown";
import CategoryComp from "@/components/Category/Category";

// Utils
import { groupByType } from "@/utils/utils";
import { IGroupedItem } from "@/utils/utils.d";

// Hooks
import Card from "./Card";

// Models
import SelectFieldOption from "@/models/SelectFieldOption";
import { Category } from "../../../../common/src";

// Fontawesome
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface IDropdownProps {
	categories: Category[];
}

const CategoriesDropdown: FC<IDropdownProps> = ({ categories }) => {
	// Data
	const groupedData: IGroupedItem<Category>[] = groupByType(categories);

	// Set the first active tab as the first group
	const [activeTab, setActiveTab] = useState<string>(groupedData[0].type);

	const isActiveTab = (type: string): boolean => {
		return type === activeTab;
	};

	const handleTabClick = (type: string): void => {
		setActiveTab(type);
	};

	return (
		<Card>
			<Dropdown
				id={`drodown-${groupedData[0].type}`}
				items={groupedData.map((group) => new SelectFieldOption(group.type, group.type))}
				onSelect={(option) => handleTabClick(option.value)}
			/>
			<Card className="mt-2">
				{groupedData.map(
					(group) =>
						isActiveTab(group.type) &&
						group.values.map((item, index) => (
							<CategoryComp
								key={`${item.type}-${index}`}
								{...item}
								icon={item.icon as IconDefinition}
							/>
						))
				)}
			</Card>
		</Card>
	);
};

export default CategoriesDropdown;
