import { useState, useCallback } from 'react';

export type TodoList = ReturnType<typeof useTodoList>;

export interface Todo {
  id: number;
  todo: string;
  isUpdate: boolean;
}

export const useTodoList = () => {
  const [text, setText] = useState<string>('');
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const insert = useCallback(() => {
    if (!text) return;

    const lastId = todoList.length ? todoList[todoList.length - 1].id : 0;

    const todo: Todo = {
      id: lastId + 1,
      todo: text,
      isUpdate: false,
    };

    setText('');
    setTodoList([...todoList, todo]);
  }, [todoList, text]);

  const setIsUpdate = useCallback(
    (id: Todo['id']) => {
      const setIsUpdateTodoList = todoList.map((todo) => {
        if (todo.id !== id) {
          return { ...todo, isUpdate: false };
        }

        const isUpdateTodo: Todo = { ...todo, isUpdate: true };
        return isUpdateTodo;
      });

      setTodoList(setIsUpdateTodoList);
    },
    [todoList]
  );

  const update = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
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
    },
    [todoList]
  );

  const sortIndex = useCallback((todoList: Todo[]) => {
    if (!todoList.length) {
      return todoList;
    }

    const sortedTodoList = todoList.map((todo, index) => ({
      ...todo,
      id: index + 1,
    }));

    return sortedTodoList;
  }, []);

  const destroy = useCallback(
    (id: Todo['id']) => {
      const destroyedTodoList = todoList.filter((todo) => todo.id !== id);
      const sortedTodoList = sortIndex(destroyedTodoList);
      setTodoList(sortedTodoList);
    },
    [sortIndex, todoList]
  );

  return {
    text,
    todoList,
    insert,
    setIsUpdate,
    update,
    destroy,
    setText,
  };
};
