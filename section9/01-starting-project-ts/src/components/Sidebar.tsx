import React from "react";

// Models
import { IProject } from "@/models/Project";

// Components
import ProjectComponent from "@/components/Project";

interface Props {
	projects: IProject[];
}

const SideBar: React.FC<Props> = ({ projects }) => {
	return (
		<aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
			<h2 className="mb-8 font-bold md:text-xl text-stone-200 uppercase">Your projects</h2>
			<ul className="mt-8">
				{projects.map((project: IProject) => (
					<ProjectComponent key={project.id} project={project} />
				))}
			</ul>
		</aside>
	);
};

export default SideBar; // This should match the name of the component
