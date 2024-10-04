import type { FC } from "react";
import Placeholder from "@/components/UI/PlaceHolder";

// FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const TransactionSkeleton: FC = () => {
	return (
		<li className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors  border-b border-gray-100 dark:border-gray-700/60 px-2">
			<div className="flex">
				<div
					className={`w-9 h-9 rounded-full shrink-0 bg-gray-400 my-2 mr-3 flex items-center justify-center`}
				>
					<FontAwesomeIcon icon={faMinus} className="text-white" />
				</div>
				<div className="grow flex items-center text-sm py-2">
					<div className="grow flex justify-between">
						<div className="self-center flex items-center space-x-2">
							{/* icon place holder */}
							<Placeholder shape="rectangle" size="sm" />
							<div className="font-medium text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white">
								{/* name place holder */}
								<Placeholder shape="rectangle" additionalSizeClasses="h-4 w-12" />
							</div>
						</div>
						<div className="shrink-0 self-start ml-2">
							{/* date placeholder */}
							<Placeholder shape="rectangle" additionalSizeClasses="h-4 w-12" />
							<span className={`font-medium`}>
								{/* amount place holder */}
								<Placeholder
									shape="rectangle"
									additionalSizeClasses="h-4 w-12"
									className="mt-2"
								/>
							</span>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export default TransactionSkeleton;
