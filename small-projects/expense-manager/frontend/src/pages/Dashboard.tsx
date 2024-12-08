import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// Components
import TransactionList from "@/components/Transaction/TransactionList";
import TransactionDoughnut from "@/components/Transaction/TransactionDoughnut";
import TransactionLineChart from "@/components/Transaction/TransactionLineChart";

// Store Types
const Dashboard: FC = () => {
	console.log("Dashboard");
	const { t } = useTranslation();

	// Render the dashboard content
	return (
		<div className="grid grid-cols-12 gap-6">
			<TransactionDoughnut />
			<TransactionList status="completed" title={t("transactions:latest")} limit={5} />
			<TransactionLineChart />
		</div>
	);
};

export default Dashboard;
