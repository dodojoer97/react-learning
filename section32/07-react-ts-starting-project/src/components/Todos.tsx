import React from "react"

// Models
import Todo from "../models/todo"

// Components
import TodoComp from "./Todo"

const Todos: React.FC<{items: Todo[]}> = (props) => {
    return <ul>
        {props.items.map(item => <TodoComp item={item}/>)}
    </ul>
}

export default Todos