// React
import type { FC, PropsWithChildren, MouseEvent } from "react";
import { useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

// UI components
import CloseButton from "./CloseButton";

// CSS
import "./Modal.css";

interface IModalProps extends PropsWithChildren {
	isOpen: boolean;
	onClose(): void;
	isFullScreen?: boolean;
}

const Modal: FC<IModalProps> = ({ isOpen, children, onClose, isFullScreen }) => {
	const modalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscapeKey);
		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [onClose]);

	const handleBackdropClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
		if (event.target === modalRef.current) {
			onClose();
		}
	}, []);

	return createPortal(
		<div
			ref={modalRef}
			className={`modal-backdrop fixed top-0 left-0 z-10 flex justify-center items-center w-[100%] h-[100dvh] ${
				isFullScreen ? "fullscreen" : ""
			}`}
			onClick={handleBackdropClick}
		>
			<div className="modal bg-slate-100 w-[90vw] min-h-[50dvh] rounded-lg shadow-lg z-20 fullscreen">
				<div className="flex justify-end px-2 py-1">
					<CloseButton onClose={onClose} />
				</div>
				{children}
			</div>
		</div>,
		document.querySelector("#modal") as HTMLDivElement
	);
};

export default Modal;
