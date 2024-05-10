import React from "react";

// Models
import { IProject } from "@/models/Project";

// Props
interface Props {
	project: IProject;
}

const ProjectComponent: React.FC<Props> = ({ project }) => {
	return (
		<li className="flex justify-between my-4">
			<p className="text-stone-800 my-4">{project.title}</p>
		</li>
	);
};

export default ProjectComponent;
