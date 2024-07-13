// React
import { FC, PropsWithChildren, useContext } from "react";

// Components
import Header from "@/components/UI/Header";
import Loader from "@/components/UI/Loader";

// Context
import { AuthContext } from "@/store/AuthContext";

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const authCTX = useContext(AuthContext);
	return (
		<>
			<div className="relative">
				<Header />
				<section className="bg-slate-50 h-svh">{children}</section>

				{authCTX.loading && <Loader />}
			</div>
		</>
	);
};

export default Layout;
