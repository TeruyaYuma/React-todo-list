import React from 'react';
import type { Todo } from '../hooks/TodoList';

interface TodoItem {
  item: Todo;
  setIsUpdate(id: Todo['id']): void;
  destroy(id: Todo['id']): void;
}

export const Item: React.FC<TodoItem> = ({ item, setIsUpdate, destroy }) => {
  return (
    <div>
      <li className="item">
        {item.id} : {item.todo}
      </li>
      <button onClick={() => setIsUpdate(item.id)}>更新</button>
      <button onClick={() => destroy(item.id)}>削除</button>
    </div>
  );
};
