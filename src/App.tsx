import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="App">
      <div className="todo">
        <h1 className="title">Todo List</h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
