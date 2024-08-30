// React
import type { FC } from "react";
import { useContext, useEffect } from "react";

// Models
import { Transaction } from "@common";

// Components
import Layout from "@/components/UI/Layout";
import Button from "@/components/UI/Button";

import TransactionList from "@/components/Transaction/TransactionList";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// Hooks
import useIsOpen from "@/hooks/useIsOpen";

// Store
import { TransactionContext, defaultTransaction } from "@/store/TransactionContext";
import { SettingsContext } from "@/store/SettingsContext";

// TODO add translations
const Dashboard: FC = () => {
	// Store
	const transactionCTX = useContext(TransactionContext);
	const settingsCTX = useContext(SettingsContext);

	// Hooks
	const { isOpen, toggleOpen } = useIsOpen("transactionPanel");

	const handleOpenPanel = (): void => {
		transactionCTX.selectTransaction(defaultTransaction);
		toggleOpen();
	};

	useEffect(() => {
		// If we did not load any categories, request them
		const handleFetch = async () => {
			if (!settingsCTX.categories.length) {
				await settingsCTX.fetchCategories();
				s;
			}
			transactionCTX.fetchTransactions();
		};

		handleFetch();
	}, []);

	return (
		<Layout>
			<div className="mx-auto max-w-lg text-center relative">
				<h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>

				<p className="mt-4 text-gray-500">Lorem, ipsum.</p>
			</div>
			<Button className="fixed bottom-20 right-10 rounded-lg" onClick={handleOpenPanel}>
				<FontAwesomeIcon
					className="cursor-pointer w-10 h-10 text-blue-600"
					icon={faPlusCircle}
				/>
			</Button>

			<TransactionList />
		</Layout>
	);
};

export default Dashboard;
