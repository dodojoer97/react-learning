import type { FC } from "react";
import { useEffect } from "react";

// i18n
import { useTranslation } from "react-i18next";

// Config
import { categoryIcons, categoryIconNames } from "@/config/categoryIcons";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IIconSelectorProps {
	onSelect(iconName: string): void;
	selectedIcon?: string;
}

const IconSelector: FC<IIconSelectorProps> = ({ onSelect, selectedIcon }) => {
	const { t } = useTranslation();

	const baseIconClasses =
		"flex justify-center items-center p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-colors my-2 cursor-pointer";

	return (
		<>
			<h2 className="text-lg font-semibold mb-4">{t("categories:selectIcon")}</h2>
			<div className="grid grid-cols-4 gap-4">
				{Object.entries(categoryIconNames).map(([_, iconName]) => (
					<article
						key={iconName}
						className={`${baseIconClasses} ${
							selectedIcon === iconName ? "selected-item" : ""
						}`}
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
