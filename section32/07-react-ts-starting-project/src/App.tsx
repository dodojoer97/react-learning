import { useState } from "react"

import "./App.css"
import NewTodo from "./components/NewTodo"

// Components
import Todos from "./components/Todos"

function App() {
	return (
		<div>
			<NewTodo />
			<Todos />
		</div>
	)
}

export default App
