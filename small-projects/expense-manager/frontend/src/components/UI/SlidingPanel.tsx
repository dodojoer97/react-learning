// React
import type { FC, PropsWithChildren } from "react";

// UI components
import CloseButton from "./CloseButton";

// CSS
import "./SlidingPanel.css";

type slideDirection = "from-left" | "from-right";

interface ISlidingPanelProps extends PropsWithChildren {
	onClose(): void;
	isOpen: boolean;
	slideDirection?: slideDirection;
}

const SlidingPanel: FC<ISlidingPanelProps> = ({
	onClose,
	isOpen,
	slideDirection = "from-left",
	children,
}) => {
	const openClass = isOpen ? "open" : "closed";

	return (
		<div
			className={`sliding-panel overflow-auto fullscreen bg-white fixed top-0 right-0 z-20 p-1 ${slideDirection} ${openClass} `}
		>
			<div className="flex justify-end px-2 py-1">
				<CloseButton onClose={onClose} />
			</div>
			{isOpen && children}
		</div>
	);
};

export default SlidingPanel;
