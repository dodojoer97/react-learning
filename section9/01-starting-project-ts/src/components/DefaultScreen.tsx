import React from "react";

// Assets
import NoProjectsImg from "@/assets/no-projects.png";

// Components
import Button from "@/components/Button";

interface Props {
	onClick(): void;
}

const DefaultScreen: React.FC<Props> = ({ onClick }) => {
	return (
		<div className="mt-24 text-center w-2/3">
			<img className="w-16 h-16 object-contain mx-auto" src={NoProjectsImg} />
			<h2 className="text-xl font-bold text-stone-500 my-4">No Project Selected</h2>
			<p className="text-stone-400 mb-4">Create a project or get started with a new one</p>
			<Button onClick={onClick} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
				Create New Project
			</Button>
		</div>
	);
};

export default DefaultScreen;
