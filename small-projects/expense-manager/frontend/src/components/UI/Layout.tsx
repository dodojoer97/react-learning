// React
import { FC, PropsWithChildren, ReactNode, useState } from "react";

// Components
// import Header from "@/components/UI/Header";
import Overlay from "@/components/UI/Overlay";
import Loader from "@/components/UI/Loader";

import Header from "@/templates/mosaic/partials/Header";
import Sidebar from "@/templates/mosaic/partials/Sidebar";

// Context

// Hooks
import useLoading from "@/hooks/useLoading";

interface Props extends PropsWithChildren {
	title: string;
	rightComponent?: ReactNode;
}

const Layout: FC<Props> = ({ children, title, rightComponent }) => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

	const loading = useLoading();

	return (
		<>
			<div className="flex h-[100dvh] overflow-hidden">
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

					<main className="grow">
						<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
							{/* Dashboard actions */}
							<div className="sm:flex sm:justify-between sm:items-center mb-8">
								{/* Left: Title */}
								<div className="mb-4 sm:mb-0">
									<h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
										{title}
									</h1>
								</div>

								{rightComponent && rightComponent}

								{/* Right: Actions */}
							</div>

							{children}
						</div>
					</main>
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
