// React
import type { FC, ReactNode } from "react";
import { useContext, useEffect } from "react";

// Models
import { Transaction } from "@common";

// Components
import Layout from "@/components/UI/Layout";
import Button from "@/components/UI/Button";
import TransactionList from "@/components/Transaction/TransactionList";
import PeriodSelector from "@/components/Transaction/PeriodSelector";
import RightActions from "@/components/Dashboard/RightActions";
import ModalBasic from "@/templates/mosaic/components/ModalBasic";
import TransactionPanel from "@/components/Transaction/TransactionPanel";
import SlidingPanel from "@/components/UI/SlidingPanel";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

//

// Store
import { TransactionContext, defaultTransaction } from "@/store/TransactionContext";
import { SettingsContext } from "@/store/SettingsContext";
import { OpenContext } from "@/store/OpenContext";
import TransactionDoughnut from "@/components/Transaction/TransactionDoughnut";

// TODO add translations
const Dashboard: FC = () => {
	// Store
	const transactionCTX = useContext(TransactionContext);
	const settingsCTX = useContext(SettingsContext);
	const { isOpen, close, toggleOpen } = useContext(OpenContext);

	// TODO maybe add to config
	const dashboardPanelId = "dashboard-panel";

	useEffect(() => {
		// If we did not load any categories, request them
		const handleFetch = async () => {
			if (!settingsCTX.categories.length) {
				await settingsCTX.fetchCategories();
			}
			transactionCTX.fetchTransactions();
		};

		handleFetch();
	}, []);

	return (
		<>
			<Layout title="Dashboard" rightComponent={<RightActions />}>
				<TransactionDoughnut />
				<TransactionList />
			</Layout>
			<SlidingPanel
				isOpen={isOpen(dashboardPanelId)}
				onClose={() => toggleOpen(dashboardPanelId)}
				slideDirection="from-right"
			>
				<TransactionPanel onSave={() => close(dashboardPanelId)} />
			</SlidingPanel>
		</>
	);
};

export default Dashboard;
