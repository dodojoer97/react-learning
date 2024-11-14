// React
import type { FC } from "react";
import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Store
import { RootState, AppDispatch } from "@/store/store"; // Redux store types
import { getBalance } from "@/store/transactionSlice";
import { formatAmount } from "@/utils/utils";

const UserBalance: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const balance = useSelector((state: RootState) => state.transaction.balance);
	const userId = useSelector((state: RootState) => state.auth.user?.uid);
	const { currency, numberSeperator } = useSelector((state: RootState) => state.settings); // Fetch currency from Redux

	useEffect(() => {
		if (userId) {
			dispatch(getBalance({ userId }));
		}
	}, []);

	return (
		<div className="flex flex-col col-span-full bg-white dark:bg-gray-800 shadow-sm rounded-xl">
			<div className="px-5 py-6">
				<div className="md:flex md:justify-between md:items-center">
					{/* Left side */}
					<div className="flex items-center mb-4 md:mb-0">
						{/* Avatar */}
						{/* <div className="mr-4">
							<img
								className="inline-flex rounded-full"
								src={""}
								width="64"
								height="64"
								alt="User"
							/>
						</div> */}
						{/* User info */}
						<div>
							<div className="mb-2">This is your current balance:</div>
							{balance !== null && (
								<div
									className={`text-3xl font-bold ${
										balance && balance > 0 ? "text-green-500" : "text-red-600"
									}`}
								>
									{formatAmount(
										balance,
										numberSeperator.label,
										currency?.value as string
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserBalance;
