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

const initialProjects: IProject[] = [];

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

	const handleEdit = (projectId: string): void => {
		const selectedProject: IProject | undefined = projects.find((project) => project.id === projectId);
		if (!selectedProject) throw new Error(`no project with id: ${projectId} found`);
		setSelectedProject(selectedProject);
		handleSetFormType(FormType.EDIT);
	};

	return (
		<main className="h-screen my-8 flex gap-8">
			<SideBar onEdit={handleEdit} projects={projects} />
			{formType === FormType.DEFAULT && <DefaultScreen onClick={() => handleSetFormType(FormType.ADD)} />}
			{formType === FormType.EDIT && selectedProject && <EditForm onSave={() => console.log("")} onCancel={() => handleSetFormType(FormType.ADD)} />}
			{formType === FormType.ADD && <AddForm onSave={handleAddNewProject} onCancel={() => handleSetFormType(FormType.DEFAULT)} />}
		</main>
	);
}

export default App;
