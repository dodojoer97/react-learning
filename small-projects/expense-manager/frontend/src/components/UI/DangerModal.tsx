// React
import type { FC } from "react";
import { createPortal } from "react-dom";

// Components
import ModalBlank from "@/templates/mosaic/components/ModalBlank";
import Button from "./Button";

interface Props {
	isOpen: boolean;
	setModalOpen(isOpen: boolean): void;
	onConfirm(): void;
}

const DangerModal: FC<Props> = ({ isOpen, setModalOpen, onConfirm }) => {
	return createPortal(
		<ModalBlank id="danger-modal" modalOpen={isOpen} setModalOpen={setModalOpen}>
			<div className="p-5 flex space-x-4">
				{/* Icon */}
				<div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-100 dark:bg-gray-700">
					<svg
						className="shrink-0 fill-current text-red-500"
						width="16"
						height="16"
						viewBox="0 0 16 16"
					>
						<path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
					</svg>
				</div>
				{/* Content */}
				<div>
					{/* Modal header */}
					<div className="mb-2">
						<div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
							Delete 1 customer?
						</div>
					</div>
					{/* Modal content */}
					<div className="text-sm mb-10">
						<div className="space-y-2">
							<p>
								Semper eget duis at tellus at urna condimentum mattis pellentesque
								lacus suspendisse faucibus interdum.
							</p>
						</div>
					</div>
					{/* Modal footer */}
					<div className="flex flex-wrap justify-end space-x-2">
						<Button
							className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
							onClick={(e: React.MouseEvent) => {
								e.stopPropagation();
								setModalOpen(false);
							}}
						>
							Cancel
						</Button>
						<Button
							className="btn-sm bg-red-500 hover:bg-red-600 text-white"
							onClick={onConfirm}
						>
							Yes, Delete it
						</Button>
					</div>
				</div>
			</div>
		</ModalBlank>,
		document.querySelector("#modal") as HTMLDivElement
	);
};

export default DangerModal;
