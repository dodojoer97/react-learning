import type { FC, PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
	title?: string;
	className?: string;
}

const Card: FC<CardProps> = ({ title, className, children }) => {
	return (
		<section
			className={`col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl ${className}`}
		>
			{title && (
				<header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
					<h2 className="font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
				</header>
			)}
			<div className="p-4">{children}</div>
		</section>
	);
};

export default Card;
