// React
import { useState, useEffect } from "react";

// Utils
import { debounce } from "@common";

const MOBILE_WIDTH = 768;

const useIsMobile = (): boolean => {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	const checkIsMobile = (): boolean => {
		return window.innerWidth <= MOBILE_WIDTH;
	};

	const handleSetMobile = (): void => {
		if (checkIsMobile()) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	const debouncedHandle = debounce(handleSetMobile, 100);

	useEffect(() => {
		if (checkIsMobile()) setIsMobile(true);
		window.addEventListener("resize", debouncedHandle);

		return () => {
			window.removeEventListener("resize", debouncedHandle);
		};
	}, []);

	return isMobile;
};

export default useIsMobile;
