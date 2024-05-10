import React from "react";

interface Props {
	[x: string]: any;
	value?: string;
	change?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<Props> = ({ change, ...props }) => {
	return <textarea onChange={change} {...props}></textarea>;
};

export default TextArea;
