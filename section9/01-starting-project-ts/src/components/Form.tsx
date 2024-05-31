import React from "react";

// Models
import { IProject } from "@/types/Project";
import { FormProps } from "@/types/FormProps";

// Components
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import Label from "@/components/Label";

// Util
import formatDateForInput from "@/utils/formatDateForInput";

const Form: React.FC<FormProps> = ({ onCancel, onSave, initialProject, canDelete, onDelete, ...props }) => {
	const [project, setProject] = React.useState<IProject>(initialProject);

	const onChange = (fieldName: keyof IProject, value: string): void => {
		setProject((currentProject) => {
			if (!(fieldName in currentProject)) {
				throw new Error(`Field name ${fieldName} does not exist in IProject`);
			}
			// Create a new object with updated fields
			const updatedProject = { ...currentProject };

			if (fieldName === "dueDate") {
				updatedProject.dueDate = new Date(value);
			} else if (fieldName !== "tasks") {
				updatedProject[fieldName] = value;
			}

			return updatedProject;
		});
	};

	const handleSave = (): void => {
		onSave(project);
	};

	return (
		// TODO export this form into a common component
		<form className="w-2/3" {...props}>
			<div className="flex flex-wrap -mx-3 mb-6 justify-end">
				<div className="flex flex-wrap justify-between w-60">
					<Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onCancel}>
						Cancel
					</Button>
					<Button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleSave}>
						Save
					</Button>
					{canDelete && (
						<Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSave}>
							Delete
						</Button>
					)}
				</div>
			</div>
			<div className="flex flex-wrap -mx-3 mb-6">
				<div className="w-full px-3">
					<Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
						Title
					</Label>
					<Input value={project.title} change={(e) => onChange("title", e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="title" type="text" />
				</div>
				<div className="w-full px-3">
					<Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
						description
					</Label>
					<TextArea value={project.description} change={(e) => onChange("description", e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" />
				</div>
				<div className="w-full px-3">
					<Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="due-date">
						Due date
					</Label>
					<Input value={formatDateForInput(project.dueDate)} change={(e) => onChange("dueDate", e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="due-date" type="date" />
				</div>
			</div>
		</form>
	);
};

export default Form;
