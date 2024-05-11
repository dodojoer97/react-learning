import React from "react";

// Models
import { FormProps } from "@/types/FormProps";

// Components
import Form from "@/components/Form";

const EditForm: React.FC<FormProps> = ({ onCancel, onSave, initialProject, ...props }) => {
	return (
		<>
			<Form {...props} initialProject={initialProject} onSave={onSave} onCancel={onCancel} />
			{/* TO ADD MORE COMPONENTS FOR EDIT */}
		</>
	);
};

export default EditForm;
