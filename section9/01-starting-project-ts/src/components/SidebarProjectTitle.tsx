import React from "react";

// Models
import { IProject } from "@/types/Project";

// Props
interface Props {
	[x: string]: any;
	project: IProject;
}

const SidebarProjectTitle: React.FC<Props> = ({ project, ...props }) => {
	return (
		<li {...props} className=" my-4 hover:bg-slate-100 hover:text-slate-950 text-stone-300cursor-pointer rounded transition-all py-1 cursor-pointer">
			<p className=" my-4 text-center">{project.title}</p>
		</li>
	);
};

export default SidebarProjectTitle;
