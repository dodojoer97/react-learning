import React from "react";

// css
import "./App.css";

// Models
import { IProject } from "@/types/Project";

// Components
import SideBar from "@/components/Sidebar";
import AddForm from "@/components/AddForm";
import EditForm from "@/components/EditForm";
import DefaultScreen from "@/components/DefaultScreen";

// Utils
import generateId from "./utils/generateId";

const initialProjects: IProject[] = [];

// Initial state
const initialProject: IProject = {
	id: generateId(),
	title: "",
	description: "",
	dueDate: new Date(),
};

enum FormType {
	DEFAULT = "DEFAULT",
	EDIT = "EDIT",
	ADD = "ADD",
}

function App() {
	const [formType, setFormType] = React.useState<FormType>(FormType.DEFAULT);
	const [projects, setProjects] = React.useState<IProject[]>(initialProjects);
	const [selectedProject, setSelectedProject] = React.useState<IProject | null>(null);

	const handleSetFormType = (formType: FormType): void => {
		setFormType(formType);
	};

	const handleAddNewProject = (project: IProject): void => {
		setProjects((currentProjects) => {
			const updatedProjects = [project, ...currentProjects];
			return updatedProjects;
		});
		handleSetFormType(FormType.DEFAULT);
		setSelectedProject(null);
	};

	const handleEditProject = (selectedProject: IProject): void => {
		setProjects((currentProjects) => {
			const updatedProjects: IProject[] = currentProjects.map((project) => {
				if (project.id === selectedProject.id) {
					return selectedProject; // Return the new item if the id matches
				}
				return project; // Otherwise, return the original item
			});

			return updatedProjects;
		});
		handleSetFormType(FormType.DEFAULT);
		setSelectedProject(null);
	};

	const handleSelectEdit = (projectId: string): void => {
		const selectedProject: IProject | undefined = projects.find((project) => project.id === projectId);
		if (!selectedProject) throw new Error(`no project with id: ${projectId} found`);

		setSelectedProject(selectedProject);
		handleSetFormType(FormType.EDIT);
	};

	return (
		<main className="h-screen my-8 flex gap-8">
			<SideBar onEdit={handleSelectEdit} projects={projects} />
			{formType === FormType.DEFAULT && <DefaultScreen onClick={() => handleSetFormType(FormType.ADD)} />}
			{formType === FormType.EDIT && selectedProject && <EditForm initialProject={selectedProject} onSave={handleEditProject} onCancel={() => handleSetFormType(FormType.ADD)} />}
			{formType === FormType.ADD && <AddForm initialProject={initialProject} onSave={handleAddNewProject} onCancel={() => handleSetFormType(FormType.DEFAULT)} />}
		</main>
	);
}

export default App;
