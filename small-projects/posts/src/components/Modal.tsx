import { FC, PropsWithChildren, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props extends PropsWithChildren {
	open: boolean;
	onClose(): void;
}

const Modal: FC<Props> = ({ children, onClose, open, ...props }) => {
	const dialog = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		if (!dialog.current) throw new Error("dialog must be defined");
		if (open) {
			dialog.current.showModal();
		} else {
			dialog.current.close();
		}
	}, [open]);

	return createPortal(
		<dialog className="modal" ref={dialog} onClose={onClose}>
			{open ? children : null}
		</dialog>,
		document.getElementById("modal") as HTMLDivElement
	);
};

export default Modal;
