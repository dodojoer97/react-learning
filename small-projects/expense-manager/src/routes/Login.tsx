// React
import { FC } from "react";

// Components
import Layout from "@/components/UI/Layout";

const Login: FC = () => {
	return (
		<Layout>
			<div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
				<h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
					Login
				</h1>
			</div>
		</Layout>
	);
};

export default Login;
