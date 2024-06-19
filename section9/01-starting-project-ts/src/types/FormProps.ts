import { IProject } from "@/types/Project";

export interface FormProps {
	[x: string]: any;
	initialProject: IProject;
	canDelete: boolean;
	onSave(project: IProject): void;
	onCancel(): void;
	onDelete?(): void;
}
