import {useState} from "react"

import './App.css';
import NewTodo from './components/NewTodo';

// Components
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {

  const [todos, setTodods] = useState<Todo[]>(
    [
      new Todo('hey')
    ]
  )

  const onAddTodo = (text: string) => {
    setTodods((prevTodos: Todo[]) => [...prevTodos, new Todo(text)])
  }

  return (
    <div>
      <NewTodo onAddTodo={onAddTodo}/>
      <Todos items={todos}/>
    </div>
  );
}

export default App;
