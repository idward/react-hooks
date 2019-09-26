import React, { FC, useContext, useState, useEffect, SyntheticEvent, FormEvent } from 'react';
import uuid from 'uuid';
import AppContext from '../context';
import { TodoConstant, Todo } from '../reducer/todo.reducer';

interface TodoFormProps {
  [key: string]: any;
}

const TodoForm: FC<TodoFormProps> = () => {
  const [value, setValue] = useState('');
  const {
    state: { currentTodo },
    dispatch,
  } = useContext(AppContext);

  const setTodoValue = (event: SyntheticEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleTodo = (event: FormEvent) => {
    event.preventDefault();
    if (!value) {
      return;
    }
    if (currentTodo.id) {
      // 修改
      currentTodo.text = value;
      dispatch({ type: TodoConstant.UPDATE_TODO, todo: currentTodo });
      dispatch({ type: TodoConstant.REMOVE_CURRENT_TODO });
    } else {
      // 新增
      const todo: Todo = {
        id: uuid.v4(),
        text: value,
        complete: false,
      };
      dispatch({ type: TodoConstant.ADD_TODO, todo });
    }
    setValue('');
  };

  useEffect(() => {
    if (currentTodo.text) {
      setValue(currentTodo.text);
    } else {
      setValue('');
    }
    console.log('todoFormEffect');
  }, [currentTodo.text]);

  console.log('todoForm');

  return (
    <form onSubmit={handleTodo}>
      <input type="text" onChange={setTodoValue} value={value} />
    </form>
  );
};

export default TodoForm;
