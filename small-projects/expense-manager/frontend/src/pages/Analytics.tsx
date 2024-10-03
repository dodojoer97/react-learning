// React
import type { FC } from "react";

// Components
import Layout from "@/components/UI/Layout";
import TransactionList from "@/components/Transaction/TransactionList";
import RightActions from "@/components/Dashboard/RightActions";
import TransactionDoughnut from "@/components/Transaction/TransactionDoughnut";
import TransactionLineChart from "@/components/Transaction/TransactionLineChart";

// TODO add translations
const Analytics: FC = () => {
	return (
		<Layout title="Analytics" rightComponent={<RightActions />}>
			<div className="grid grid-cols-12 gap-6">
				<TransactionDoughnut />
				<TransactionList />
				<TransactionLineChart />
			</div>
		</Layout>
	);
};

export default Analytics;
