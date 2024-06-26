import { FC, PropsWithChildren, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// Config
import modalDelay from "@/config/modalDelay";

// CSS
import "./Modal.css";

interface Props extends PropsWithChildren {
	isOpen: boolean;
	onClose(): void;
	isLoading: boolean;
}

const Modal: FC<Props> = ({ children, onClose, isOpen, isLoading }) => {
	const dialog = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		if (!dialog.current) throw new Error("dialog must be defined");
		const currentDialog = dialog.current;

		if (isOpen) {
			currentDialog.showModal();
			currentDialog.style.opacity = "1";
		} else {
			currentDialog.style.opacity = "0";
			setTimeout(() => {
				currentDialog.close();
			}, modalDelay);
		}
	}, [isOpen]);

	return createPortal(
		<dialog className={`modal relative`} ref={dialog} onClose={onClose}>
			{isLoading && <div className="overlay absolute bg-slate-400 top-0 right-0 bottom-0 left-0 opacity-55"></div>}
			{children}
		</dialog>,
		document.getElementById("modal") as HTMLDivElement
	);
};

export default Modal;
