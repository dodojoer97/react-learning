import { useState } from "react";

// CSS
import "./App.css";

// Components
import Header from "./components/Header";
import Form from "./components/Form";
import ToDoList from "./components/ToDoList";

// Util
import getId from "./util/getId";

const INITIAL_TASKS = [{ id: getId(), description: "Buy eggs" }];

function App() {
	const [tasks, setTasks] = useState(INITIAL_TASKS);

	function handleAddTask(task) {
		setTasks((prevTasks) => {
			return [{ ...task, id: getId() }, ...prevTasks];
		});
	}

	return (
		<>
			<Header />
			<Form onAddTask={handleAddTask} />
			<ToDoList tasks={tasks} />
		</>
	);
}

export default App;
