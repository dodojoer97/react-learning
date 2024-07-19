// React
import { FC, PropsWithChildren } from "react";

const Overlay: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="overlay absolute top-0 right-0 bottom-0 left-0 flex justify-center pt-80 z-10 bg-slate-400 bg-opacity-30">
			{children}
		</div>
	);
};

export default Overlay;
