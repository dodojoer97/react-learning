import React from "react";

interface Props {
	[x: string]: any;
}

const Label: React.FC<Props> = ({ children, ...props }) => {
	return <label {...props}>{children}</label>;
};

export default Label;
