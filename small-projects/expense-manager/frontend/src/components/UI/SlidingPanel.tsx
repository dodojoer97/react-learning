import type { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

// UI components
import CloseButton from "./CloseButton";

// Transition
import Transition from "@/templates/mosaic/utils/Transition";

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
	const openClass = isOpen
		? "translate-x-0"
		: slideDirection === "from-right"
		? "translate-x-full"
		: "-translate-x-full";
	const panelDirection = slideDirection === "from-right" ? "right-0" : "left-0";

	return createPortal(
		<>
			{/* Modal backdrop */}
			<Transition
				className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
				show={isOpen}
				enter="transition ease-out duration-200"
				enterStart="opacity-0"
				enterEnd="opacity-100"
				leave="transition ease-out duration-100"
				leaveStart="opacity-100"
				leaveEnd="opacity-0"
				aria-hidden="true"
				onClick={onClose}
			/>
			<div
				className={`fixed inset-y-0 ${panelDirection} z-50 bg-white dark:bg-gray-800 shadow-lg w-full max-w-lg transform ${openClass} transition-transform duration-300 ease-in-out`}
			>
				<div className="flex justify-end p-4">
					<CloseButton onClose={onClose} />
				</div>
				<div className="p-4 overflow-y-auto">{isOpen && children}</div>
			</div>
		</>,
		document.querySelector("#sliding-panel") as HTMLDivElement
	);
};

export default SlidingPanel;
