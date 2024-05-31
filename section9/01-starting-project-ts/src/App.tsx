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

	const handleCancel = (): void => {
		setFormType(FormType.DEFAULT);
		setSelectedProject(null);
	};

	const handleAddNewProject = (project: IProject): void => {
		setProjects((currentProjects) => {
			const updatedProjects = [project, ...currentProjects];
			return updatedProjects;
		});
		setFormType(FormType.DEFAULT);
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
		setFormType(FormType.DEFAULT);
		setSelectedProject(null);
	};

	const handleSelectEdit = (projectId: string): void => {
		const selectedProject: IProject | undefined = projects.find((project) => project.id === projectId);
		if (!selectedProject) throw new Error(`no project with id: ${projectId} found`);
		setSelectedProject(selectedProject);
		setFormType(FormType.EDIT);
	};

	return (
		<main className="h-screen my-8 flex gap-8">
			<SideBar selectedProject={selectedProject} projects={projects} onEdit={handleSelectEdit} />
			{formType === FormType.DEFAULT && <DefaultScreen onClick={() => setFormType(FormType.ADD)} />}
			{formType === FormType.EDIT && selectedProject && <EditForm canDelete={true} key={selectedProject.id} initialProject={selectedProject} onSave={handleEditProject} onCancel={handleCancel} />}
			{formType === FormType.ADD && <AddForm onSave={handleAddNewProject} onCancel={handleCancel} />}
		</main>
	);
}

export default App;
