import './App.scss';
import AddTodo from './components/add-todo';
import Header from './components/header';
import AllTodoList from './components/list-all-todo';

function App() {
  return (
    <div className="App">
      <Header />
      <AddTodo />
      <AllTodoList />
    </div>
  );
}

export default App;
