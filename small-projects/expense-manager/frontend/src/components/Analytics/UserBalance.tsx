// React
import type { FC } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Store
import { RootState, AppDispatch } from "@/store/store"; // Redux store types

const UserBalance: FC = () => {
	const balance = useSelector((state: RootState) => state.transaction.balance);

	return <></>;
};
