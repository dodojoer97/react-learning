
import React from 'react';

// Models
import Task from "@/models/Task"

// Components
import TaskComponent from '@/components/Task';


interface Props {
    tasks: Task[]
}

const SideBar: React.FC<Props> = ({tasks}) => {
    return <aside>
        {tasks.map((task: Task) => <TaskComponent task={task}/>)}
    </aside>
}

export default SideBar; // This should match the name of the component
