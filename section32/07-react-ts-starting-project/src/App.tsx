import './App.css';

// Components
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
  const todos = [
    new Todo('hey')
  ]

  return (
    <div>
      <Todos items={todos}/>
    </div>
  );
}

export default App;
