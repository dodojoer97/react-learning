import {useRef} from "react"


// Css
import classes from "./NewTodo.module.css"


const NewTodo: React.FC<{onAddTodo: (text: string) => void}> = (props) => {
    const todoTextInputRef = useRef<HTMLInputElement | null>(null)

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()

        const enteredText = todoTextInputRef.current?.value

        if(!enteredText || enteredText?.trim().length === 0) {
            // Throw
            return
        }

        props.onAddTodo(enteredText)
    }

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="text">todo Text</label>
            <input type="text" id="text" ref={todoTextInputRef}/>
            <button>Add Todo</button>
        </form>
    )
}

export default NewTodo