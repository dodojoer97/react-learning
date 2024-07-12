// React
import type { FC, PropsWithChildren } from "react";

// Components
import Header from "@/components/UI/Header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<section className="bg-slate-50 h-svh">{children}</section>
		</>
	);
};

export default Layout;
