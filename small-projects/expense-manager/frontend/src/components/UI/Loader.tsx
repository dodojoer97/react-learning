// React
import { FC } from "react";

// CSS
import classes from "./Loader.module.css";

interface Props {
	className?: string;
}

const Loader: FC<Props> = ({ className }) => {
	return (
		<div className={`flex justify-center ${className}`}>
			<div className={classes.dot}></div>
			<div className={classes.dot}></div>
			<div className={classes.dot}></div>
		</div>
	);
};

export default Loader;
