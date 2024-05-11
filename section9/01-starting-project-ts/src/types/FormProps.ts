import { IProject } from "@/types/Project";

export interface FormProps {
	[x: string]: any;
	initialProject: IProject;
	onSave(project: IProject): void;
	onCancel(): void;
}
