import { FC } from "react";

// Assets
import reactLogo from "@/assets/react.svg";

const Header: FC = () => {
	return (
		<header className="bg-gray-800 text-white py-4">
			<div className="container mx-auto flex justify-between items-center px-6">
				<div className="text-lg">
					<span>Brand Name</span>
				</div>
				<div className="flex items-center">
					<a href="https://react.dev" target="_blank">
						<img src={reactLogo} className="logo react w-20" alt="React logo" />
					</a>{" "}
				</div>
			</div>
		</header>
	);
};

export default Header;
