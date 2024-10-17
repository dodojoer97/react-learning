import type { HTMLProps } from "react";

// FontAwesome
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface InputProps extends HTMLProps<HTMLInputElement> {
	label: string;
	id: string;
	hiddenLabel?: boolean;
	inputIcon?: IconDefinition;
	type?: string;
	error?: string;
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
