import React from 'react';
// import uuid from 'uuid';
import { Todo } from '../reducer/todo.reducer';

const todos: Todo[] = [
  // { id: uuid.v4(), text: 'Eat breakfast', complete: false },
  // { id: uuid.v4(), text: 'Do laundry', complete: false },
  // { id: uuid.v4(), text: 'Finish project', complete: true },
];

const currentTodo: Partial<Todo> = {};

interface ContextType {
  [key: string]: any;
}

const initialContext: ContextType = {
  initialState: { todos, currentTodo },
};

export default React.createContext(initialContext);
