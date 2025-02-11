import React from "react"
import Todo from "../models/todo"

// Css
import classes from "./TodoItem.module.css"

const TodoComp: React.FC<{item: Todo}> = ({item}) => {
    return (
        <li className={classes.item} key={item.id}>{item.text}</li>
    )
}

export default TodoComp