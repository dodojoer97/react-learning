// React
import type { FC } from "react";

interface Props {
	message: string;
	className?: string;
}

const InputError: FC<Props> = ({ message, className = "" }) => {
	return <p className={`text-xs mt-1 text-red-500 ${className}`}>{message}</p>;
};

export default InputError;
