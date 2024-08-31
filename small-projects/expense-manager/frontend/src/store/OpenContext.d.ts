// Types
export interface IOpenContext {
	isOpen: (id: string) => boolean;
	toggleOpen: (id: string) => void;
	open: (id: string) => void;
	close: (id: string) => void;
}
