// React
import type { FC } from "react";

// Components
import Calendar from "@/components/UI/Calendar";
import Layout from "@/components/UI/Layout";
import Button from "@/components/UI/Button";
import SlidingPanel from "@/components/UI/SlidingPanel";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// Hooks
import useIsOpen from "@/hooks/useIsOpen";

// TODO add translations
const Dashboard: FC = () => {
	// Store

	// Hooks
	const { isOpen, toggleOpen } = useIsOpen(true);

	const handleOpenPanel = (): void => {
		toggleOpen();
	};

	return (
		<Layout>
			<div className="mx-auto max-w-lg text-center relative">
				<h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>

				<p className="mt-4 text-gray-500">Lorem, ipsum.</p>
			</div>
			<Button className="fixed bottom-10 right-10 rounded-lg" onClick={handleOpenPanel}>
				<FontAwesomeIcon
					className="cursor-pointer w-10 h-10 text-blue-600"
					icon={faPlusCircle}
				/>
			</Button>

			{/* ADD RECORD */}
			<SlidingPanel isOpen={isOpen} onClose={toggleOpen}>
				test
			</SlidingPanel>
		</Layout>
	);
};

export default Dashboard;
