import { FC } from "react";

import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";

interface Props {
	openCart(): void;
}

const Header: FC<Props> = ({ openCart }) => {
	return (
		<header className="flex justify-between p-5 border border-b-orange-950">
			<button type="button" onClick={openCart}>
				Cart
			</button>
			<img src={viteLogo} alt="Vite" className="w-20" />
			<img src={reactLogo} alt="React" className="w-20" />
		</header>
	);
};

export default Header;
