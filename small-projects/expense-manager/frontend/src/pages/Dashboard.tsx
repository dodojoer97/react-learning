// React
import type { FC } from "react";
import { useContext } from "react";

// Models
import { Transaction } from "@common";

// Components
import Calendar from "@/components/UI/Calendar";
import Layout from "@/components/UI/Layout";
import Button from "@/components/UI/Button";
import SlidingPanel from "@/components/UI/SlidingPanel";
import TransactionForm from "@/components/Transaction/TransactionForm";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// Hooks
import useIsOpen from "@/hooks/useIsOpen";

// Store
import { TransactionContext, defaultTransaction } from "@/store/TransactionContext";
import { AuthContext } from "@/store/AuthContext";

// TODO add translations
const Dashboard: FC = () => {
	// Store
	const transactionCTX = useContext(TransactionContext);
	const authContext = useContext(AuthContext);

	// Hooks
	const { isOpen, toggleOpen } = useIsOpen(true);

	const handleOpenPanel = (): void => {
		if (!authContext.user) throw new Error("user must be selected to open");
		transactionCTX.selectTransaction(defaultTransaction);
		toggleOpen();
	};

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

			{/* ADD RECORD */}
			<SlidingPanel isOpen={isOpen} onClose={toggleOpen} slideDirection="from-right">
				<TransactionForm onSave={() => {}} />
			</SlidingPanel>
		</Layout>
	);
};

export default Dashboard;
