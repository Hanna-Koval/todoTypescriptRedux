import './App.scss';
import AddTodo from './components/add-todo/addTodo';
import Header from './components/header/header';
import ListTodos from './components/list-all-todo/listAllTodo';

function App() {
  return (
    <div className="App">
      <Header />
      <AddTodo />
      <ListTodos />
    </div>
  );
}

export default App;
