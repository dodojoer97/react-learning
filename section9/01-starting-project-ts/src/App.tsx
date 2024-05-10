import { useState } from "react";

// css
import "./App.css";

// Models
import { IProject } from "@/models/Project";

// Components
import SideBar from "@/components/Sidebar";
import AddForm from "./components/AddForm";

function App() {
	const [count, setCount] = useState(0);
	const projects: IProject[] = [];
	return (
		<div className="flex">
			<main className="h-screen my-8 flex gap-8"></main>
			<SideBar projects={projects} />
			<AddForm onSave={() => console.log("")} onCancel={() => console.log("")} />
		</div>
	);
}

export default App;
