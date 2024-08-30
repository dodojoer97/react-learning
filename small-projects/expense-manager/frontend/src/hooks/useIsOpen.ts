import { useState, useEffect, useCallback } from "react";

// Define a Set to track the open items globally
const openSet: Set<string> = new Set();

const useIsOpen = (
	id: string // Unique identifier for the item being tracked
): {
	isOpen: boolean;
	toggleOpen(): void;
	close(idToClose: string): void;
} => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleOpen = useCallback(() => {
		if (openSet.has(id)) {
			openSet.delete(id);
			setIsOpen(false);
		} else {
			openSet.add(id);
			setIsOpen(true);
		}
	}, [id]);

	const close = useCallback(
		(idToClose: string) => {
			console.log("idToClose: ", idToClose);
			if (openSet.has(idToClose)) {
				openSet.delete(idToClose);
				if (idToClose === id) {
					setIsOpen(false);
				}
				if (openSet.size === 0) {
					document.body.style.overflow = "";
				}
			}
			console.log("openSet; ", openSet);
		},
		[id]
	);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else if (openSet.size === 0) {
			document.body.style.overflow = "";
		}
	}, [isOpen]);

	useEffect(() => {
		// Clean up on component unmount
		return () => {
			openSet.delete(id);
			if (openSet.size === 0) {
				document.body.style.overflow = "";
			}
		};
	}, [id]);

	return {
		isOpen,
		toggleOpen,
		close,
	};
};

export default useIsOpen;
