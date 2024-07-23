// React
import type { FC } from "react";

interface Props {
	message: string;
	className?: string
}

const InputError: FC<Props> = ({ message, className = 'text-yellow-500' }) => {
	return <p className={`p-2 rounded ${className}`}>{message}</p>;
};

export default InputError;
