import React, { useState } from "react"

// Models
import Todo from "../models/todo"

interface TodoContext {
	items: Todo[]
	addTodo: (text: string) => void
	removeTodo: (id: string) => void
}

export const TodosContext = React.createContext<TodoContext>({
	items: [],
	addTodo: () => {},
	removeTodo: (id: string) => {},
})

const TodosContextProvider: React.FC = () => {
	const [todos, setTodods] = useState<Todo[]>([new Todo("hey")])

	const addTodo = (text: string) => {
		setTodods((prevTodos: Todo[]) => [...prevTodos, new Todo(text)])
	}

	const removeTodo = (todoId: string) => {
		setTodods((prevTodos) => {
			return prevTodos.filter((todo) => todo.id !== todoId)
		})
	}

	const contextValue: TodoContext = {
		items: todos,
		addTodo,
		removeTodo,
	}

	return <TodosContext.Provider value={contextValue}></TodosContext.Provider>
}

export default TodosContextProvider
