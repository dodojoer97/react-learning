interface ITask {
    title: string
    description: string
    dueDate: Date
}

class Task implements ITask {
    title: string;
    description: string;
    dueDate: Date;
    constructor(
        title: string,
        description: string,
        dueDate: Date,
    
    ) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
    }
}

export default Task