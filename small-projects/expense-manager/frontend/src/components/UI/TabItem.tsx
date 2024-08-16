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
		<li className={`me-2 pb-2 ${className || ""}`}>
			<h2
				onClick={onClick}
				className={`cursor-pointer  mb-2 border-b-2 capitalize ${
					isActive
						? "border-blue-500 text-blue-600"
						: "border-transparent hover:text-gray-700 hover:border-gray-300"
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
