import { useState } from "react";

// Will contain form inputs, add button to add a todo
export default function Form({ onAddTask }) {
	const [task, setTask] = useState({ description: "" });

	function handleChange(fieldName, value) {
		setTask((currentTask) => {
			return {
				...currentTask,
				[fieldName]: value,
			};
		});
	}

	return (
		<form className="todo-form p-3">
			<div className="mb-3">
				<label htmlFor="description" className="form-label">
					Task
				</label>
				<input type="text" className="form-control" id="description" aria-describedby="description" onChange={(event) => handleChange("description", event.target.value)} />
			</div>
			<button type="button" className="btn btn-primary" onClick={() => onAddTask(task)}>
				Add
			</button>
		</form>
	);
}
