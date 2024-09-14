// React
import type { FC, ReactNode } from "react";
import { useContext, useEffect } from "react";

// Models
import { Transaction } from "@common";

// Components
import Layout from "@/components/UI/Layout";
import TransactionList from "@/components/Transaction/TransactionList";
import RightActions from "@/components/Dashboard/RightActions";
import TransactionDoughnut from "@/components/Transaction/TransactionDoughnut";

// Store

// TODO add translations
const Dashboard: FC = () => {
	console.log("re render Dashboard");

	return (
		<>
			<Layout title="Dashboard" rightComponent={<RightActions />}>
				<div className="grid grid-cols-12 gap-6">
					<TransactionDoughnut />
					<TransactionList />
				</div>
			</Layout>
		</>
	);
};

export default Dashboard;
