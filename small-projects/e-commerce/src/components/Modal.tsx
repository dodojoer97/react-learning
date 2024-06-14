import { FC, useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface Props {
	open: boolean;
	children: ReactNode;
	onClose(): void;
}

const Modal: FC<Props> = ({ open, children, onClose }) => {
	const dialog = useRef<HTMLDialogElement | null>(null);
	useEffect(() => {
		if (open) {
			dialog.current?.showModal();
		} else {
			dialog.current?.close();
		}
	}, [open]);

	return (
		<>
			<dialog ref={dialog}>
				<div className="container bg-white">
					<div className="flex justify-end">
						<button className="border-slate-100 border" type="button" onClick={onClose}>
							X
						</button>
					</div>
					{children}
				</div>
			</dialog>
		</>
	);
};

export default Modal;
