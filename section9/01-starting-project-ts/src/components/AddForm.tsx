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

// Initial state
const initialProject: IProject = {
	id: "id",
	title: "",
	description: "",
	dueDate: new Date(),
};

const AddForm: React.FC<Props> = ({ onCancel, onSave, ...props }) => {
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
			} else {
				updatedProject[fieldName] = value;
			}

			return updatedProject;
		});
	};

	return (
		<form className="w-full max-w-lg" {...props}>
			<div className="flex flex-wrap -mx-3 mb-6 justify-end">
				<div className="flex flex-wrap justify-between w-40">
					<Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cancel</Button>
					<Button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Save</Button>
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

export default AddForm;
