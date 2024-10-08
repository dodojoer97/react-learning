import type { FC } from "react";

type PlaceholderProps = {
	shape?: "circle" | "pill" | "square" | "rectangle";
	size?: "sm" | "md" | "lg" | "xl";
	color?: string;
	additionalSizeClasses?: string;
	className?: string;
};

const Placeholder: FC<PlaceholderProps> = ({
	shape = "rectangle",
	size = "md",
	color = "bg-gray-200",
	className,
	additionalSizeClasses,
}) => {
	const shapeClasses = {
		circle: "rounded-full",
		pill: "rounded-full",
		square: "rounded-md",
		rectangle: "rounded-md",
	};

	const sizeClasses = {
		sm: "h-6 w-6",
		md: "h-8 w-8",
		lg: "h-16 w-16",
		xl: "h-64 w-64", // Extra-large placeholder
	};

	return (
		<div
			className={`${className} ${additionalSizeClasses || sizeClasses[size]} ${color} ${
				shapeClasses[shape]
			} animate-pulse duration-500`}
		/>
	);
};

export default Placeholder;
