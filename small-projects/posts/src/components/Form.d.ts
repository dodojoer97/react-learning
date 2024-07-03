export interface Props {
	onSave(title: string, body: string): void;
	onCancel(): void;
	title?: string;
	body?: string;
}

export type InputName = "title" | "body";

export interface IState {
    title: string,
    body: string
}