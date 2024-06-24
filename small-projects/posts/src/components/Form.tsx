import { FC, useRef } from "react";

interface Props {
	onSave(): void;
	onCancel(): void;
	title?: string;
	body?: string;
}

type InputName = "title" | "body";

const Form: FC<Props> = ({ onSave, onCancel, title, body }) => {
	// Elements
	const titleInput = useRef<HTMLInputElement | null>(null);
	const bodyTextArea = useRef<HTMLTextAreaElement | null>(null);

	// Values
	const titleValue = useRef<string>(title || "");
	const bodyValue = useRef<string>(body || "");

	const handleChange = (input: InputName, value: string) => {
		if (input === "title") {
			titleValue.current = value;
		} else if (input === "body") {
			bodyValue.current = value;
		}
	};

	return (
		<form>
			<input type="text" ref={titleInput} value={titleValue.current} onChange={(e) => handleChange("title", e.target.value)} />
			<textarea ref={bodyTextArea} value={bodyValue.current} onChange={(e) => handleChange("body", e.target.value)}></textarea>
			<button onClick={onCancel}>cancel</button>
			<button onClick={onSave}>save</button>
		</form>
	);
};

export default Form;
