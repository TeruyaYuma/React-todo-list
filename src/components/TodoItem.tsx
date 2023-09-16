import React from 'react';
import type { Todo } from '../hooks/TodoList';
import TodoItemStyle from '../assets/scss/TodoItem.module.scss';

interface TodoItem {
  item: Todo;
  setIsUpdate(id: Todo['id']): void;
  destroy(id: Todo['id']): void;
}

export const Item: React.FC<TodoItem> = ({ item, setIsUpdate, destroy }) => {
  return (
    <div className={TodoItemStyle.todoItem}>
      <li className={TodoItemStyle.itemArea}>
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
          <button
            className={TodoItemStyle.destroyButton}
            onClick={() => destroy(item.id)}
          >
            削除
          </button>
        </div>
      </li>
    </div>
  );
};
