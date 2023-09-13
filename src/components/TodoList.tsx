import React from 'react';
import { Item } from './TodoItem';
import { useTodoList } from '../hooks/TodoList';
import type { TodoList as typeTodoList } from '../hooks/TodoList';

export const TodoList = () => {
  const {
    text,
    todoList,
    setText,
    insert,
    setIsUpdate,
    update,
    destroy,
  }: typeTodoList = useTodoList();

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
