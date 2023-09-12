import React, { useState } from 'react';
import { Item } from './TodoItem';

export interface Todo {
  id: number;
  todo: string;
  isUpdate: boolean;
}

export const TodoList = () => {
  const [text, setText] = useState<string>('');
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const insert = () => {
    if (!text) return;

    const lastId = todoList.length ? todoList[todoList.length - 1].id : 0;

    const todo: Todo = {
      id: lastId + 1,
      todo: text,
      isUpdate: false,
    };

    setText('');
    setTodoList([...todoList, todo]);
  };

  const setIsUpdate = (id: Todo['id']) => {
    const setIsUpdateTodoList = todoList.map((todo) => {
      if (todo.id !== id) {
        return { ...todo, isUpdate: false };
      }

      const isUpdateTodo: Todo = { ...todo, isUpdate: true };
      return isUpdateTodo;
    });

    setTodoList(setIsUpdateTodoList);
  };
  const update = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.currentTarget.value === '') return;

    const targetTodo = todoList[index];

    const updatedTodoList = todoList.map((todo) => {
      if (todo.id !== targetTodo.id) {
        return todo;
      }

      const updatedTodo: Todo = {
        ...todo,
        todo: e.currentTarget.value,
        isUpdate: false,
      };
      return updatedTodo;
    });

    setTodoList(updatedTodoList);
  };

  const destroy = (id: Todo['id']) => {
    const destroyedTodoList = todoList.filter((todo) => todo.id !== id);
    const sortedTodoList = sortIndex(destroyedTodoList);
    setTodoList(sortedTodoList);
  };

  const sortIndex = (todoList: Todo[]) => {
    if (!todoList.length) {
      return todoList;
    }

    const sortedTodoList = todoList.map((todo, index) => ({
      ...todo,
      id: index + 1,
    }));

    return sortedTodoList;
  };
  return (
    <div>
      <div className="input-area">
        <input
          className="input-area_input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={insert}>追加</button>
      </div>

      <ul className="list">
        {todoList.length > 0 &&
          todoList.map((todo, index) => (
            <React.Fragment key={`list-${index}`}>
              {todo.isUpdate ? (
                <div>
                  <input type="text" onKeyDown={(e) => update(index, e)} />
                </div>
              ) : (
                <Item item={todo} setIsUpdate={setIsUpdate} destroy={destroy} />
              )}
            </React.Fragment>
          ))}
      </ul>
    </div>
  );
};