// React
import type { FC } from "react";

// Components
import Layout from "@/components/UI/Layout";
import TransactionList from "@/components/Transaction/TransactionList";
import TransactionDoughnut from "@/components/Transaction/TransactionDoughnut";
import TransactionLineChart from "@/components/Transaction/TransactionLineChart";

// TODO add translations
const Dashboard: FC = () => {
	return (
		<div className="grid grid-cols-12 gap-6">
			<TransactionDoughnut />
			<TransactionList status="completed" title="Latest Transactions" limit={5} />
			<TransactionLineChart />
		</div>
	);
};

export default Dashboard;
