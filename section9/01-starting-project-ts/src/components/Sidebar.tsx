import React from "react";

// Models
import { IProject } from "@/types/Project";

// Components
import SidebarProjectTitle from "@/components/SidebarProjectTitle";

// Css
import styles from "@/css/Sidebar.module.css";

interface Props {
	selectedProject: IProject | null;
	projects: IProject[];
	onEdit(projectId: string): void;
}

const SideBar: React.FC<Props> = ({ selectedProject, projects, onEdit }) => {
	const isSelected = (id: string): boolean => {
		if (!selectedProject) return false;
		console.log("id: ", selectedProject.id === id);
		return selectedProject.id === id;
	};
	return (
		<aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
			<h2 className="mb-8 font-bold md:text-xl text-stone-200 uppercase text-center">Your projects</h2>
			<ul className="mt-8">
				{selectedProject && selectedProject.id}
				{projects.map((project: IProject) => (
					<SidebarProjectTitle className={isSelected(project.id) ? styles.active : undefined} onClick={() => onEdit(project.id)} key={project.id} project={project} />
				))}
			</ul>
		</aside>
	);
};

export default SideBar; // This should match the name of the component
