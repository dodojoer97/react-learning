import React from "react";

// Models
import { IProject } from "@/models/Project";

// Components
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import Label from "./Label";

// Util
import formatDateForInput from "@/utils/formatDateForInput";

interface Props {
	[x: string]: any;
	onSave(project: IProject): void;
	onCancel(): void;
}
const Form: React.FC<Props> = ({ onCancel, onSave, ...props }) => {
	return (
		<>
			edit
			<form {...props}></form>;
		</>
	);
};

export default Form;
