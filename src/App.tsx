import './App.css';
import { TodoList } from './components/TodoList';
import AppStyle from './assets/scss/App.module.scss';

function App() {
  return (
    <div className={AppStyle.app}>
      <div className={AppStyle.wrapper}>
        <h1 className={AppStyle.title}>Todo List</h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
