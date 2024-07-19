// React
import { FC } from "react";

// CSS
import "./Loader.css";

const Loader: FC = () => {
	return (
		<div className="flex justify-center">
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
		</div>
	);
};

export default Loader;
