// React
import type { FC } from "react";

// Components
import Layout from "@/components/UI/Layout";
import TransactionList from "@/components/Transaction/TransactionList";
import RightActions from "@/components/Dashboard/RightActions";
import UserBalance from "@/components/Analytics/UserBalance";
import TransactionLineChart from "@/components/Transaction/TransactionLineChart";

// TODO add translations
const Analytics: FC = () => {
	return (
		<Layout title="Analytics" rightComponent={<RightActions />}>
			<UserBalance />
			{/* <div className="grid grid-cols-12 gap-6">
			</div> */}
		</Layout>
	);
};

export default Analytics;
