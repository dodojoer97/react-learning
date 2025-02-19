import React, { useContext } from "react"

// Context
import { TodosContext } from "../store/todos-context"

// Models
import Todo from "../models/todo"

// Components
import TodoComp from "./Todo"

// Css
import classes from "./Todos.module.css"

const Todos: React.FC<{ items: Todo[] }> = (props) => {
	const context = useContext(TodosContext)

	return (
		<ul className={classes.todo}>
			{context.items.map((item) => (
				<TodoComp item={item} />
			))}
		</ul>
	)
}

export default Todos
