import { Task } from "@/types/Task";

export interface IProject {
	id: string;
	title: string;
	description: string;
	dueDate: Date;
	tasks?: Task[];
}
