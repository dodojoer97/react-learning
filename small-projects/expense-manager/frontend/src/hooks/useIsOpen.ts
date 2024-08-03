import { useState, useEffect, useCallback } from "react";

const animationDuration = 300;

const useIsOpen = (
	disableScroll?: boolean
): {
	isOpen: boolean;
	toggleOpen(): void;
	isClosing: boolean;
} => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isClosing, setIsClosing] = useState<boolean>(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	useEffect(() => {
		if (!disableScroll) return;
		document.body.style.overflow = isOpen ? "hidden" : "visible";
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) {
			setIsClosing(true);
			setTimeout(() => {
				setIsClosing(false);
			}, animationDuration);
		}
	}, [isOpen]);

	return {
		isOpen,
		toggleOpen,
		isClosing,
	};
};

export default useIsOpen;
