import React from "react"
import Todo from "../models/todo"

const TodoComp: React.FC<{item: Todo}> = ({item}) => {
    return (
        <li key={item.id}>{item.text}</li>
    )
}

export default TodoComp