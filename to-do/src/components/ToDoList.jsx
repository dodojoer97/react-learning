// Componets
import ToDoItem from "./ToDoItem";

// Displays the list of todos
export default function ToDoList({ tasks }) {
	return (
		<ul>
			{tasks.map((task) => (
				<ToDoItem key={task.id} id={task.id} taskName={task.description} />
			))}
		</ul>
	);
}
