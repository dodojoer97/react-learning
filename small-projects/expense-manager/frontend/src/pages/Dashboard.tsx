// React
import type { FC } from "react";

// i18n
import { useTranslation } from "react-i18next";

// Components
import TransactionList from "@/components/Transaction/TransactionList";
import TransactionDoughnut from "@/components/Transaction/TransactionDoughnut";
import TransactionLineChart from "@/components/Transaction/TransactionLineChart";

// TODO add translations
const Dashboard: FC = () => {
	console.log("re render Dashboard");
	const { t } = useTranslation();

	return (
		<div className="grid grid-cols-12 gap-6">
			<TransactionDoughnut />
			<TransactionList status="completed" title={t("transactions:latest")} limit={5} />
			<TransactionLineChart />
		</div>
	);
};

export default Dashboard;
