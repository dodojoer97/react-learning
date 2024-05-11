import React from "react";

// Models
import { FormProps } from "@/types/FormProps";

// Components
import Form from "@/components/Form";

const AddForm: React.FC<FormProps> = ({ onCancel, onSave, initialProject, ...props }) => {
	return <Form {...props} initialProject={initialProject} onSave={onSave} onCancel={onCancel} />;
};

export default AddForm;
