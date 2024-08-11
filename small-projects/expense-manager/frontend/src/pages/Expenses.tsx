// React
import type { FC } from "react";

// Components
import Calendar from "@/components/UI/Calendar";
import Layout from "@/components/UI/Layout";

// TODO add translations
const Expenses: FC = () => {
	return (
		<Layout>
			<div className="mx-auto max-w-lg text-center">
				<h1 className="text-2xl font-bold sm:text-3xl">Expenses</h1>

				<p className="mt-4 text-gray-500">Lorem, ipsum.</p>
			</div>

			<Calendar />
		</Layout>
	);
};

export default Expenses;
