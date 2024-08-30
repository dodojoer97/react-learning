import { useState, useEffect, useCallback } from "react";

const useIsOpen = (
	disableScroll?: boolean
): {
	isOpen: boolean;
	toggleOpen(): void;
} => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	useEffect(() => {
		const overflow = document.body.style.overflow;
		document.body.style.overflow = isOpen ? "hidden" : "";
		console.log("isOpen: ", isOpen);
	}, [isOpen]);

	return {
		isOpen,
		toggleOpen,
	};
};

export default useIsOpen;
