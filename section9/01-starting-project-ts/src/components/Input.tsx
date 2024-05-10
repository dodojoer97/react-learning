import React from "react";

// Props
interface Props {
	[x: string]: any;
	change: (event: React.ChangeEvent<HTMLInputElement>) => void; // More specific function type for change events
}

const Input: React.FC<Props> = ({ change, ...props }) => {
	return (
		<div>
			<input {...props} onChange={change} />
		</div>
	);
};

export default Input; // This should match the name of the component
