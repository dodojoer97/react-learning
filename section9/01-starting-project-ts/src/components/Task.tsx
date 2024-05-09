import React from "react";

// Models
import Task from "@/models/Task";

// Props
interface Props {
    task: Task
}


const TaskComponent: React.FC<Props> = ({task}) => {
    return <li>
        <p>{task.title}</p>        
        <p>{task.description}</p>        
        <p>{task.dueDate.toDateString()}</p>        
    </li>
}

export default TaskComponent