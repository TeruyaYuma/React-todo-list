import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import Todo from './assets/scss/App.module.scss';

function App() {
  return (
    <div className="App">
      <div className={Todo.todo}>
        <h1>Todo List</h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
