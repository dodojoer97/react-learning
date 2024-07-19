// React
import { FC } from "react";

// Components
import Layout from "@/components/UI/Layout";
// Translation
import { useTranslation } from 'react-i18next';

const Home: FC = () => {
	const {t} = useTranslation("home")

	return (
		<Layout>
			<h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
				{t('homeTitle')}
			</h1>
			<p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
				{t('homeDesc')}
			</p>
		</Layout>
	);
};

export default Home;
