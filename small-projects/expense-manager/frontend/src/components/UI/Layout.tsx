// React
import { FC, PropsWithChildren, useContext, useState } from "react";

// Components
// import Header from "@/components/UI/Header";
import Overlay from "@/components/UI/Overlay";
import Loader from "@/components/UI/Loader";

import Header from "@/templates/mosaic/partials/Header";
import Sidebar from "@/templates/mosaic/partials/Sidebar";

// Context
import { AuthContext } from "@/store/AuthContext";
import { SettingsContext } from "@/store/SettingsContext";

// Hooks
import useLoading from "@/hooks/useLoading";

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const authCTX = useContext(AuthContext);
	const settingsContext = useContext(SettingsContext);

	const loading: boolean = useLoading([authCTX, settingsContext]);

	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

	return (
		<>
			<div className="flex h-[100dvh] overflow-hidden">
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

					<main className="grow">{children}</main>
				</div>

				{/* {loading && (
					<Overlay>
						<Loader />
					</Overlay>
				)} */}
			</div>
		</>
	);
};

export default Layout;
