// React
import { FC } from "react";

// Components
import Layout from "@/components/UI/Layout";

const Home: FC = () => {
	return (
		<Layout>
			<div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
				<h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
					Expense Manager
				</h1>
				<p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium vitae
					error voluptas nemo laudantium quod ipsa dolores, modi consequuntur sunt?
					Debitis veniam quos, eveniet eaque itaque voluptatibus facilis minima qui!
				</p>
			</div>
		</Layout>
	);
};

export default Home;
