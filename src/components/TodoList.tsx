import React, { FC, useContext } from 'react';
import AppContext from '../context';
import { Todo, TodoConstant } from '../reducer/todo.reducer';

interface TodoListProps {
  [key: string]: any;
}

const TodoList: FC<TodoListProps> = () => {
  const { state, dispatch } = useContext(AppContext);

  const setCurrentTodo = (currentTodo: Todo) => {
    dispatch({ type: TodoConstant.SET_CURRENT_TODO, currentTodo });
  };

  const removeTodo = (todo: Todo) => {
    dispatch({ type: TodoConstant.REMOVE_TODO, todo });
    dispatch({ type: TodoConstant.REMOVE_CURRENT_TODO });
  };

  return (
    <div>
      <ul>
        {state.todos.map((todo: Todo) => {
          return (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.complete ? 'line-through' : '',
                  color: todo.complete ? 'grey' : 'black',
                }}
                onClick={() => dispatch({ type: TodoConstant.TOGGLE_TODO, todo })}>
                {todo.text}
              </span>
              <span>
                <button onClick={() => setCurrentTodo(todo)}>modify</button>
                <button onClick={() => removeTodo(todo)}>delete</button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
