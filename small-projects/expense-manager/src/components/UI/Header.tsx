import { FC, useState } from "react";
import { Link } from "react-router-dom"; // Import Link

// Translation
import { useTranslation } from 'react-i18next';

// Assets
import viteLogo from "/vite.svg";
import closeIcon from "@/assets/close.svg";
import burgerIcon from "@/assets/burger.svg";

// Componenets
import Button from "@/components/UI/Button";

const Header: FC = () => {
	const {t} = useTranslation("header")

	const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

	const handleToggleMenu = (): void => {
		setMobileMenuOpen((isOpen: boolean) => !isOpen);
	};

	// Icon to display, burger or close
	const menuIcon: string = mobileMenuOpen ? closeIcon : burgerIcon;

	return (
		<header className="border-b border-gray-200 sticky top-0 z-10">
			<nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
					<Link to="/" className="flex items-center">
						<img src={viteLogo} className="mr-3 h-6 sm:h-9" alt="Vite logo" />
					</Link>
					<div className="flex items-center lg:order-2">
						<Link
							to="/login"
							className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
						>
							{t('signin')}
						</Link>
						<Link
							to="/signup"
							className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
						>
							{t('signup')}
						</Link>
						<Button
							onClick={handleToggleMenu}
							type="button"
							className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="mobile-menu-2"
							aria-expanded="false"
						>
							<img src={menuIcon} alt="menuIcon" className={` w-6 h-6`} />
						</Button>
					</div>
					<div
						className={`${
							!mobileMenuOpen ? "hidden" : undefined
						} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
						id="mobile-menu-2"
					>
						<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
							<li>
								{/* <Link
									to="/"
									className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
								>
									home
								</Link> */}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
