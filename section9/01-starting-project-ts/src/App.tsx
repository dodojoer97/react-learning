import React from "react";

// css
import "./App.css";

// Models
import { IProject } from "@/models/Project";

// Components
import SideBar from "@/components/Sidebar";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";

const initialProjects: IProject[] = [];

type FormType = "edit" | "add" | "default";

function App() {
	const [formType, setFormType] = React.useState<FormType>("default");
	const [projects, setProjects] = React.useState<IProject[]>(initialProjects);

	return (
		<div className="flex">
			<main className="h-screen my-8 flex gap-8">
				<SideBar projects={projects} />
				{formType === "default" && <h1>default</h1>}
				{formType === "edit" && <EditForm onSave={() => console.log("")} onCancel={() => console.log("")} />}
				{formType === "add" && <AddForm onSave={() => console.log("")} onCancel={() => console.log("")} />}
			</main>
		</div>
	);
}

export default App;
