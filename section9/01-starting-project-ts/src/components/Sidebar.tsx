import React from "react";

// Models
import { IProject } from "@/types/Project";

// Components
import SidebarProjectTitle from "@/components/SidebarProjectTitle";

interface Props {
	projects: IProject[];
	onEdit(projectId: string): void;
}

const SideBar: React.FC<Props> = ({ onEdit, projects }) => {
	return (
		<aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
			<h2 className="mb-8 font-bold md:text-xl text-stone-200 uppercase text-center">Your projects</h2>
			<ul className="mt-8">
				{projects.map((project: IProject) => (
					<SidebarProjectTitle onClick={() => onEdit(project.id)} key={project.id} project={project} />
				))}
			</ul>
		</aside>
	);
};

export default SideBar; // This should match the name of the component
