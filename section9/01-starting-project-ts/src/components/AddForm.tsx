import React from "react";

// Components
import Form from "@/components/Form";

// Utils
import generateId from "@/utils/generateId";

// Types
import { IProject } from "@/types/Project";

export interface FormProps {
	[x: string]: any;
	onSave(project: IProject): void;
	onCancel(): void;
}

const AddForm: React.FC<FormProps> = ({ onCancel, onSave, ...props }) => {
	// Initial state
	const initialProject: IProject = {
		id: generateId(),
		title: "",
		description: "",
		dueDate: new Date(),
	};
	return <Form canDelete={false} {...props} initialProject={initialProject} onSave={onSave} onCancel={onCancel} />;
};

export default AddForm;
