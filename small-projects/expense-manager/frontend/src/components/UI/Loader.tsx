// React
import { FC } from "react";

// CSS
import "./Loader.css";

interface Props {
	className?: string;
}

const Loader: FC<Props> = ({ className }) => {
	return (
		<div className={`flex justify-center ${className}`}>
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
		</div>
	);
};

export default Loader;
