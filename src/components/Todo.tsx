import React, { FC, useReducer } from 'react';

interface ITodoProps {
  [key: string]: any;
}

/**
 * State
 */
interface TodoState {
  count: number;
}

/**
 * Action constants
 */
enum TodoConstants {
  'INCREAEMNT' = 'INCREAMENT',
  'DECREMENT' = 'DECREMENT',
}

/**
 * Actions
 */
interface IncrementAction {
  type: TodoConstants.INCREAEMNT;
}

interface DecrementAction {
  type: TodoConstants.DECREMENT;
}

type TodoAction = IncrementAction | DecrementAction;

const initialState: TodoState = {
  count: 0,
};

function reducer(state: TodoState, action: TodoAction) {
  switch (action.type) {
    case 'INCREAMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

const Todo: FC<ITodoProps> = () => {
  const [{ count }, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch({ type: TodoConstants.INCREAEMNT })}>Increment</button>
      <button onClick={() => dispatch({ type: TodoConstants.DECREMENT })}>Decrement</button>
    </div>
  );
};

export default Todo;
