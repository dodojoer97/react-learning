import type { FC, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
	[key: string]: any;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
	return <button {...props}>{children}</button>;
};

export default Button;
