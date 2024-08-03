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
		if (!disableScroll) return;
		document.body.style.overflow = isOpen ? "hidden" : "visible";
	}, [isOpen]);

	return {
		isOpen,
		toggleOpen,
	};
};

export default useIsOpen;
