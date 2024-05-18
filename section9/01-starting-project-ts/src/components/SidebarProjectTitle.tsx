import React from "react";

// Models
import { IProject } from "@/types/Project";

// Css
import styles from "@/css/SidebarProjectTitle.module.css";

// Props
interface Props {
	[x: string]: any;
	isSelected: boolean;
	project: IProject;
}

const SidebarProjectTitle: React.FC<Props> = ({ project, isSelected, ...props }) => {
	return (
		<li {...props} className={`${isSelected ? styles.active : undefined} my-4 hover:bg-slate-100 hover:text-slate-950 text-stone-300 rounded transition-all py-1 cursor-pointer`}>
			<p className=" my-4 text-center">{project.title}</p>
		</li>
	);
};

export default SidebarProjectTitle;
