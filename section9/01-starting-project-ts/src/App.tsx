import React from "react";

// css
import "./App.css";

// Models
import { IProject } from "@/models/Project";

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

	const handleCreateNewProject = (): void => {
		setFormType(FormType.ADD);
	};

	const handleReturnToDefault = (): void => {
		setFormType(FormType.DEFAULT);
	};

	const handleAddNewProject = (project: IProject): void => {
		setProjects((currentProjects) => {
			const updatedProjects = [project, ...currentProjects];
			return updatedProjects;
		});
		handleReturnToDefault();
	};

	return (
		<main className="h-screen my-8 flex gap-8">
			<SideBar projects={projects} />
			{formType === FormType.DEFAULT && <DefaultScreen onClick={handleCreateNewProject} />}
			{formType === FormType.EDIT && <EditForm onSave={() => console.log("")} onCancel={handleReturnToDefault} />}
			{formType === FormType.ADD && <AddForm onSave={handleAddNewProject} onCancel={handleReturnToDefault} />}
		</main>
	);
}

export default App;
