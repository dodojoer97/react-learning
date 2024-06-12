import { FC, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// Types
import { Post } from "@/types";

interface Props {
	open: boolean;
	post: Post;
}

const EditModal: FC<Props> = ({ post, open }) => {
	const dialog = useRef<HTMLDialogElement | null>(null);

	// useEffect(() => {
	// 	if (open) {
	// 		dialog.current?.showModal();
	// 	} else {
	// 		dialog.current?.close();
	// 	}
	// }, [open]);

	return createPortal(
		<>
			<dialog ref={dialog} open={open}>
				{post.title} {post.description}
			</dialog>
		</>,
		document.getElementById("modal") as HTMLElement
	);
};

export default EditModal;
