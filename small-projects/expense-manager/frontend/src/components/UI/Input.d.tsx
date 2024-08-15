import type { HTMLProps } from "react";

export interface InputProps extends HTMLProps<HTMLInputElement> {
	label: string;
	id: string;
	hiddenLabel?: boolean;
	inputIcon?: string;
	clickableIcon?: boolean;
	type?: string;
	onClickIcon?(): void;
}

export interface SelectInputProps<T> extends HTMLProps<HTMLSelectElement> {
	options: Array<{ text: string; value: T }>;
	label: string;
	id: string;
	hiddenLabel?: boolean;
}

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
	label: string;
	id: string;
	hiddenLabel?: boolean;
}
