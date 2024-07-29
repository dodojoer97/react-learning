import type { FC } from "react";
import { useEffect } from "react";

// Config
import { categoryIcons, categoryIconNames } from "@/config/categoryIcons";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IIconSelectorProps {
	onSelect(iconName: string): void;
}

const IconSelector: FC<IIconSelectorProps> = ({ onSelect }) => {
	return (
		<>
			<div className="grid grid-cols-4 gap-4">
				{Object.entries(categoryIconNames).map(([_, iconName]) => (
					<article
						key={iconName}
						className="flex justify-center items-center p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-colors my-2 cursor-pointer"
						onClick={() => onSelect(iconName)}
					>
						<FontAwesomeIcon
							icon={categoryIcons[iconName]}
							className="text-blue-500 text-2xl"
						/>
					</article>
				))}
			</div>
		</>
	);
};

export default IconSelector;
