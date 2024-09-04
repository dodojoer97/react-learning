import React, { useState } from "react";

import SearchModal from "../components/ModalSearch";
import Notifications from "../components/DropdownNotifications";
import Help from "../components/DropdownHelp";
import UserMenu from "../components/DropdownProfile";
import ThemeToggle from "../components/ThemeToggle";

function Header({ sidebarOpen, setSidebarOpen, variant = "default" }) {
	const [searchModalOpen, setSearchModalOpen] = useState(false);

	return (
		<header
			className={`sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 before:-z-10 z-30 ${
				variant === "v2" || variant === "v3"
					? "before:bg-white after:absolute after:h-px after:inset-x-0 after:top-full after:bg-gray-200 dark:after:bg-gray-700/60 after:-z-10"
					: "max-lg:shadow-sm lg:before:bg-gray-100/90 dark:lg:before:bg-gray-900/90"
			} ${variant === "v2" ? "dark:before:bg-gray-800" : ""} ${
				variant === "v3" ? "dark:before:bg-gray-900" : ""
			}`}
		>
			<div className="px-4 sm:px-6 lg:px-8">
				<div
					className={`flex items-center justify-between h-16 ${
						variant === "v2" || variant === "v3"
							? ""
							: "lg:border-b border-gray-200 dark:border-gray-700/60"
					}`}
				>
					{/* Header: Left side */}
					<div className="flex">
						{/* Hamburger button */}
						<button
							className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden"
							aria-controls="sidebar"
							aria-expanded={sidebarOpen}
							onClick={(e) => {
								e.stopPropagation();
								setSidebarOpen(!sidebarOpen);
							}}
						>
							<span className="sr-only">Open sidebar</span>
							<svg
								className="w-6 h-6 fill-current"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect x="4" y="5" width="16" height="2" />
								<rect x="4" y="11" width="16" height="2" />
								<rect x="4" y="17" width="16" height="2" />
							</svg>
						</button>
					</div>

					{/* Header: Right side */}
					<div className="flex items-center space-x-3">
						<div>
							<button
								className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ml-3 ${
									searchModalOpen && "bg-gray-200 dark:bg-gray-800"
								}`}
								onClick={(e) => {
									e.stopPropagation();
									setSearchModalOpen(true);
								}}
								aria-controls="search-modal"
							>
								<span className="sr-only">Search</span>
								<svg
									className="fill-current text-gray-500/80 dark:text-gray-400/80"
									width={16}
									height={16}
									viewBox="0 0 16 16"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z" />
									<path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z" />
								</svg>
							</button>
							<SearchModal
								id="search-modal"
								searchId="search"
								modalOpen={searchModalOpen}
								setModalOpen={setSearchModalOpen}
							/>
						</div>
						<Notifications align="right" />
						<Help align="right" />
						<ThemeToggle />
						{/*  Divider */}
						<hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
						<UserMenu align="right" />
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;

// // React
// import type { FC } from "react";
// import { useState, useContext, useCallback } from "react";

// // Router
// import { NavLink } from "react-router-dom"; // Import NavLink
// import { useNavigate } from "react-router-dom";

// // Translation
// import { useTranslation } from "react-i18next";

// // Assets
// import viteLogo from "/vite.svg";
// import closeIcon from "@/assets/close.svg";
// import burgerIcon from "@/assets/burger.svg";

// // Componenets
// import Button from "@/components/UI/Button";

// // Store
// import { AuthContext } from "@/store/AuthContext";

// const Header: FC = () => {
// 	const { user, logout } = useContext(AuthContext);
// 	const navigate = useNavigate();
// 	const { t } = useTranslation("header");

// 	// CSS classes
// 	const baseNavClasses =
// 		"text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800";
// 	const activeNavClasses = "bg-gray-200 dark:bg-gray-900";

// 	const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

// 	const handleToggleMenu = useCallback(() => {
// 		setMobileMenuOpen((isOpen) => !isOpen);
// 	}, []);

// 	const handleLogout = (): void => {
// 		logout();
// 		navigate("/login");
// 	};

// 	// Icon to display, burger or close
// 	const menuIcon: string = mobileMenuOpen ? closeIcon : burgerIcon;

// 	return (
// 		<header className="border-b border-gray-200 sticky top-0 z-10">
// 			<nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
// 				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
// 					<Button
// 						onClick={handleToggleMenu}
// 						type="button"
// 						className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
// 						aria-controls="mobile-menu-2"
// 						aria-expanded="false"
// 					>
// 						<img src={menuIcon} alt="menuIcon" className={` w-6 h-6`} />
// 					</Button>

// 					<NavLink to="/" className="flex items-center">
// 						<img src={viteLogo} className="mr-3 h-6 sm:h-9" alt="Vite logo" />
// 					</NavLink>
// 					<div className="flex items-center lg:order-2">
// 						{!user && (
// 							<>
// 								<NavLink
// 									to="/login"
// 									className={({ isActive }) =>
// 										`${baseNavClasses} ${isActive ? activeNavClasses : ""}`
// 									}
// 								>
// 									{t("signin")}
// 								</NavLink>
// 								<NavLink
// 									to="/signup"
// 									className={({ isActive }) =>
// 										`${baseNavClasses} ${isActive ? activeNavClasses : ""}`
// 									}
// 								>
// 									{t("signup")}
// 								</NavLink>
// 							</>
// 						)}
// 						{user && (
// 							<Button
// 								onClick={handleLogout}
// 								type="button"
// 								className={baseNavClasses}
// 								aria-controls="mobile-menu-2"
// 								aria-expanded="false"
// 							>
// 								logout
// 							</Button>
// 						)}
// 					</div>
// 				</div>
// 				<div
// 					className={`${
// 						mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
// 					} transition duration-100 ease-in-out justify-between items-center w-full lg:flex lg:w-auto lg:order-1 absolute left-0  bg-white py-3`}
// 					id="mobile-menu-2"
// 					style={{ top: "61px" }}
// 				>
// 					<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
// 						{user && (
// 							<>
// 								<li>
// 									<NavLink
// 										to="/settings"
// 										className={({ isActive }) =>
// 											`${baseNavClasses} ${isActive ? activeNavClasses : ""}`
// 										}
// 										end
// 									>
// 										{t("settings")}
// 									</NavLink>
// 								</li>
// 								<li>
// 									<NavLink
// 										to="/settings/categories"
// 										className={({ isActive }) =>
// 											`${baseNavClasses} ${isActive ? activeNavClasses : ""}`
// 										}
// 										end
// 									>
// 										{t("categories")}
// 									</NavLink>
// 								</li>
// 								<li>
// 									<NavLink
// 										to="/dashboard"
// 										className={({ isActive }) =>
// 											`${baseNavClasses} ${isActive ? activeNavClasses : ""}`
// 										}
// 										end
// 									>
// 										{/* TODO add tranlsations */}
// 										dashboard
// 									</NavLink>
// 								</li>
// 							</>
// 						)}
// 					</ul>
// 				</div>
// 			</nav>
// 		</header>
// 	);
// };

// export default Header;
