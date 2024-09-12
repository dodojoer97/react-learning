import type { FC, PropsWithChildren } from "react";

interface ITabProps extends PropsWithChildren {
	name: string;
	isActive: boolean;
	onClick(): void;
	className?: string;
	displaySelected?: boolean;
}

const TabItem: FC<ITabProps> = ({
	name,
	children,
	isActive,
	onClick,
	className,
	displaySelected = true,
}) => {
	return (
		<li className={`mr-6 last:mr-0 ${className || ""}`}>
			<h2
				onClick={onClick}
				className={`cursor-pointer block pb-3 whitespace-nowrap border-b-2 font-medium ${
					isActive
						? "text-violet-500 border-violet-500"
						: "text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border-transparent"
				}`}
			>
				{name}
			</h2>
			{displaySelected && (
				<div className={isActive ? "opacity-100" : "opacity-0"}>{children}</div>
			)}
		</li>
	);
};

export default TabItem;
