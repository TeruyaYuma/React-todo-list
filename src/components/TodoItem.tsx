import React from 'react';
import type { Todo } from '../hooks/TodoList';
import TodoItemStyle from '../assets/scss/TodoItem.module.scss';
import GlobalStyle from '../assets/scss/Global.module.scss';

interface TodoItem {
  index: number;
  item: Todo;
  setIsUpdate(id: Todo['id']): void;
  destroy(id: Todo['id']): void;
  update(index: number, e: React.KeyboardEvent<HTMLInputElement>): void;
}

export const Item: React.FC<TodoItem> = ({
  index,
  item,
  setIsUpdate,
  destroy,
  update,
}) => {
  return (
    <div className={TodoItemStyle.todoItem}>
      {item.isUpdate ? (
        <input
          className={GlobalStyle.input}
          type="text"
          onKeyDown={(e) => update(index, e)}
        />
      ) : (
        <>
          <p>
            {item.id} : {item.todo}
          </p>
          <div className={TodoItemStyle.buttonArea}>
            <button
              className={TodoItemStyle.updateButton}
              onClick={() => setIsUpdate(item.id)}
            >
              更新
            </button>
            <button onClick={() => destroy(item.id)}>削除</button>
          </div>
        </>
      )}
    </div>
  );
};
