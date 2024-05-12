import React from "react";

// Models
import { IProject } from "@/types/Project";


// Css
import styles from "../css/Sidebar.module.css";

// Props
interface Props {
	[x: string]: any;
	project: IProject;
	isSelected: boolean
}

const SidebarProjectTitle: React.FC<Props> = ({ project, isSelected, ...props }) => {
	const activeClass: string | undefined = isSelected ? styles.active : undefined
	return (
		<>
			
			<li {...props} className={`${activeClass || ""} my-4 hover:bg-slate-100 hover:text-slate-950 text-stone-300 rounded transition-all py-1 cursor-pointer`}>
				<p className="my-4 text-center">{project.title}</p>
			</li>
			
		</>
	);
};

export default SidebarProjectTitle;
