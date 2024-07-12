import type { FC, HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLFormElement> {
	[key: string]: any;
}

const Input: FC<InputProps> = ({ ...props }) => {
	return <form {...props}></form>;
};

export default Input;
