// React
import { FC, PropsWithChildren, useContext } from "react";

// Components
import Header from "@/components/UI/Header";
import Overlay from "@/components/UI/Overlay";
import Loader from "@/components/UI/Loader";

// Context
import { AuthContext } from "@/store/AuthContext";
import { SettingsContext } from "@/store/SettingsContext";

// Hooks
import useLoading from "@/hooks/useLoading";

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const authCTX = useContext(AuthContext)
	const settingsContext = useContext(SettingsContext)

	const loading: boolean = useLoading([authCTX, settingsContext])
	
	return (
		<>
			<div className="relative bg-slate-50">
				<Header />
				<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
					<section className="bg-slate-50 h-svh">{children}</section>
				</div>
				{loading && (
					<Overlay>
						<Loader />
					</Overlay>
				)}
			</div>
		</>
	);
};

export default Layout;