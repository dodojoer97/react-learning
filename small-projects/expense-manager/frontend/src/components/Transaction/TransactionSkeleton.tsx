import type { FC } from "react";
import Placeholder from "@/components/UI/PlaceHolder";

const TransactionSkeleton: FC = () => {
	return (
		<li className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors  border-b border-gray-100 dark:border-gray-700/60 px-2 py-2">
			<div className="flex justify-between items-center">
				<div className="flex items-center justify-between gap-2">
					{/* Placeholder for delete icon */}
					<Placeholder shape="circle" size="md" color="bg-gray-300" />
					{/* Placeholder for category icon */}
					<Placeholder shape="circle" size="sm" color="bg-gray-300" className="ml-2" />
					{/* Placeholder for category name */}
					<Placeholder shape="rectangle" size="sm" color="bg-gray-300" className="w-14" />
				</div>
			</div>
		</li>
	);
};

export default TransactionSkeleton;
