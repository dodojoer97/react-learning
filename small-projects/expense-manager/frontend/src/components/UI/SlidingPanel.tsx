// React
import type { FC, PropsWithChildren } from "react";

// UI components
import CloseButton from "./CloseButton";

// CSS
import "./SlidingPanel.css";

interface ISlidingPanelProps extends PropsWithChildren {
	onClose(): void;
	isOpen: boolean;
	isClosing: boolean;
}

const SlidingPanel: FC<ISlidingPanelProps> = ({ children, onClose, isOpen, isClosing }) => {
	const openClass = isOpen ? "open" : "";
	const closingClass = isClosing ? "closing" : "";

	return (
		<div
			className={`sliding-panel fullscreen bg-white fixed top-0 right-0 z-20 ${openClass} ${closingClass}`}
		>
			<div className="flex justify-end px-2 py-1">
				<CloseButton onClose={onClose} />
			</div>
			{children}
		</div>
	);
};

export default SlidingPanel;
