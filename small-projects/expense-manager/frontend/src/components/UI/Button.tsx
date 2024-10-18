import type { FC, PropsWithChildren } from "react";

// Components
import Loader from "./Loader";

interface ButtonProps extends PropsWithChildren {
	[key: string]: any;
	loading?: boolean;
}

const Button: FC<ButtonProps> = ({ children, loading, disabled, ...props }) => {
	return (
		<button {...props} disabled={disabled || loading}>
			{loading ? <Loader /> : children}
		</button>
	);
};

export default Button;
