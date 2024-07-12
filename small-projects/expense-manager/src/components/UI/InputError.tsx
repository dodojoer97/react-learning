// React
import type { FC } from "react";

interface Props {
	message: string;
}

const InputError: FC<Props> = ({ message }) => {
	return <p className=" text-yellow-500 p-2 rounded">{message}</p>;
};

export default InputError;
