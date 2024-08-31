// React
import { createContext, useState, FC, Context, useCallback, useEffect } from "react";
import type { PropsWithChildren } from "react";

// Interface
import { IOpenContext } from "./OpenContext.d";

// Base context with default values
export const OpenContext: Context<IOpenContext> = createContext<IOpenContext>({
	isOpen: () => false,
	toggleOpen: () => {},
	open: () => {},
	close: () => {},
});

const OpenContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [openSet, setOpenSet] = useState<Set<string>>(new Set());

	const isOpen = useCallback(
		(id: string): boolean => {
			return openSet.has(id);
		},
		[openSet]
	);

	const toggleOpen = useCallback((id: string): void => {
		setOpenSet((prevSet) => {
			const newSet = new Set(prevSet);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	}, []);

	const open = useCallback((id: string): void => {
		setOpenSet((prevSet) => {
			const newSet = new Set(prevSet);
			newSet.add(id);
			return newSet;
		});
	}, []);

	const close = useCallback((id: string): void => {
		setOpenSet((prevSet) => {
			const newSet = new Set(prevSet);
			newSet.delete(id);
			return newSet;
		});
	}, []);

	useEffect(() => {
		// Handle body overflow when any panel is open
		if (openSet.size > 0) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [openSet]);

	const contextValue: IOpenContext = {
		isOpen,
		toggleOpen,
		open,
		close,
	};

	return <OpenContext.Provider value={contextValue}>{children}</OpenContext.Provider>;
};

export default OpenContextProvider;
