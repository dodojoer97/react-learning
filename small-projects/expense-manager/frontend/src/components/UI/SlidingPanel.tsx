// React
import type { FC, PropsWithChildren } from "react";

// UI components
import CloseButton from "./CloseButton";

// CSS
import "./SlidingPanel.css";

interface ISlidingPanelProps extends PropsWithChildren {
	onClose(): void;
	isOpen: boolean;
}

const SlidingPanel: FC<ISlidingPanelProps> = ({ children, onClose, isOpen }) => {
	const openClass = isOpen ? "open" : "closed";

	return (
		<div className={`sliding-panel fullscreen bg-white fixed top-0 right-0 z-20 ${openClass} `}>
			<div className="flex justify-end px-2 py-1">
				<CloseButton onClose={onClose} />
			</div>
			{children}
		</div>
	);
};

export default SlidingPanel;
