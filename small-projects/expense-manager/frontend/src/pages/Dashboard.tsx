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

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

//

// Store
import { TransactionContext, defaultTransaction } from "@/store/TransactionContext";
import { SettingsContext } from "@/store/SettingsContext";
import { OpenContext } from "@/store/OpenContext";
import TransactionPie from "@/components/Analytics/TransactionPie";

// TODO add translations
const Dashboard: FC = () => {
	// Store
	const transactionCTX = useContext(TransactionContext);
	const settingsCTX = useContext(SettingsContext);
	const { open } = useContext(OpenContext);

	const panelId = "transactionPanel";

	const handleOpenPanel = (): void => {
		transactionCTX.selectTransaction(defaultTransaction);
		open(panelId);
	};

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
		<Layout title="Dashboard" rightComponent={<RightActions />}>
			<TransactionList />

			{/* <PeriodSelector /> */}

			<TransactionPie transactions={transactionCTX.getMappedTransactions("expense")} />

			{/* <Button className="fixed bottom-20 right-10 rounded-lg" onClick={handleOpenPanel}>
				<FontAwesomeIcon
					className="cursor-pointer w-10 h-10 text-blue-600"
					icon={faPlusCircle}
				/>
			</Button> */}
		</Layout>
	);
};

export default Dashboard;
