// React
import type { FC } from "react";

// Components
import Layout from "@/components/UI/Layout";
import TransactionList from "@/components/Transaction/TransactionList";
import RightActions from "@/components/Dashboard/RightActions";
import TransactionDoughnut from "@/components/Transaction/TransactionDoughnut";

// TODO add translations
const Dashboard: FC = () => {
	return (
		<Layout title="Dashboard" rightComponent={<RightActions />}>
			<div className="grid grid-cols-12 gap-6">
				<TransactionDoughnut />
				<TransactionList />
			</div>
		</Layout>
	);
};

export default Dashboard;
