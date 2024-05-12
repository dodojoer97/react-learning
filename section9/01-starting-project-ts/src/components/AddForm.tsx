import React from "react";

// Types
import { FormProps } from "@/types/FormProps";
import {IProject} from "@/types/Project"

// Components
import Form from "@/components/Form";


// Utils
import generateId from "@/utils/generateId";

interface Props {
	[x: string]: any;
	onSave(project: IProject): void;
	onCancel(): void;
}

const AddForm: React.FC<Props> = ({ onCancel, onSave, ...props }) => {
	// Initial state
	const initialProject: IProject = {
		id: generateId(),
		title: "",
		description: "",
		dueDate: new Date(),
	};
	return <Form {...props} initialProject={initialProject} onSave={onSave} onCancel={onCancel} />;
};

export default AddForm;
