import { FC, PropsWithChildren, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// Config
import modalDelay from "@/config/modalDelay";

// CSS
import "./Modal.css";

interface Props extends PropsWithChildren {
	open: boolean;
	onClose(): void;
}

const Modal: FC<Props> = ({ children, onClose, open }) => {
	const dialog = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		if (!dialog.current) throw new Error("dialog must be defined");
		const currentDialog = dialog.current;

		if (open) {
			currentDialog.showModal();
			currentDialog.style.opacity = "1";
		} else {
			currentDialog.style.opacity = "0";
			setTimeout(() => {
				currentDialog.close();
			}, modalDelay);
		}
	}, [open]);

	return createPortal(
		<dialog className="modal" ref={dialog} onClose={onClose}>
			{children}
		</dialog>,
		document.getElementById("modal") as HTMLDivElement
	);
};

export default Modal;
