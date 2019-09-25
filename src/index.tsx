import React, { FC, useReducer, useContext } from 'react';
import { render } from 'react-dom';
import AppContext from './context';
import appReducer from './reducer';

import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

interface IAppProps {
  [key: string]: any;
}

const App: FC<IAppProps> = () => {
  const { initialState } = useContext(AppContext);
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </AppContext.Provider>
  );
};

declare let module: any;

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
