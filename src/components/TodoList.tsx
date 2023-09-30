import React, { useState } from 'react';
import { Item } from './TodoItem';
import { useTodoList } from '../hooks/TodoList';
import type { TodoList as typeTodoList } from '../hooks/TodoList';
import TodoListStyle from '../assets/scss/TodoList.module.scss';
import GlobalStyle from '../assets/scss/Global.module.scss';
import { validateInput } from '../helper/validate';

export const TodoList = () => {
  const [error, setError] = useState<string>('');
  const {
    text,
    todoList,
    setText,
    insert,
    setIsUpdate,
    update,
    destroy,
  }: typeTodoList = useTodoList();

  const insertWithValidate = (text: string) => {
    setError('');
    const res = validateInput(text, setError);
    if (res) return;
    insert();
  };

  return (
    <div className={TodoListStyle.todoList}>
      <div>
        <input
          className={GlobalStyle.input}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={() => insertWithValidate(text)}>追加</button>
      </div>
      <p>{error}</p>

      <ul>
        {todoList.length > 0 &&
          todoList.map((todo, index) => (
            <li className={TodoListStyle.itemArea} key={`item-${index}`}>
              <Item
                index={index}
                item={todo}
                setIsUpdate={setIsUpdate}
                destroy={destroy}
                update={update}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
