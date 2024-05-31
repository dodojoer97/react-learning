import React from "react";

// Models
import { FormProps } from "@/types/FormProps";

// Components
import Form from "@/components/Form";

const EditForm: React.FC<FormProps> = ({ onCancel, onSave, initialProject, canDelete, onDelete, ...props }) => {
	return (
		<>
			<Form {...props} initialProject={initialProject} canDelete={true} onSave={onSave} onCancel={onCancel} onDelete={onDelete} />
			{/* TO ADD MORE COMPONENTS FOR EDIT */}
		</>
	);
};

export default EditForm;
