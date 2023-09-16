import React, { useState } from 'react';
import { Item } from './TodoItem';
import { useTodoList } from '../hooks/TodoList';
import type { TodoList as typeTodoList } from '../hooks/TodoList';
import TodoListStyle from '../assets/scss/TodoList.module.scss';
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
      <div className={TodoListStyle.inputArea}>
        <input
          className={TodoListStyle.input}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className={TodoListStyle.button}
          onClick={() => insertWithValidate(text)}
        >
          追加
        </button>
      </div>
      <p>{error}</p>

      <ul>
        {todoList.length > 0 &&
          todoList.map((todo, index) => (
            <React.Fragment key={`list-${index}`}>
              {todo.isUpdate ? (
                <div>
                  <input
                    className={TodoListStyle.input}
                    type="text"
                    onKeyDown={(e) => update(index, e)}
                  />
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
