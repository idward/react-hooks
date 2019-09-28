import React, { FC, useState, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../context';
import appReducer from '../reducer';

import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { TodoConstant } from '../reducer/todo.reducer';

interface IAppProps {
  [key: string]: any;
}

/**
 * 自定义hooks
 * @param url
 */
const useApi = (endpoint: string) => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      (async () => {
        const response = await axios.get(endpoint);
        await setData(response.data[0]);
        console.log('api');
      })();
    }, [endpoint]);
  
    return data;
  };

const App: FC<IAppProps> = () => {
  const { initialState } = useContext(AppContext);
  const [state, dispatch] = useReducer(appReducer, initialState);
  const savedTodos = useApi('https://todos-api-zkjdtcbkvp.now.sh/todos');

  useEffect(() => {
    dispatch({ type: TodoConstant.GET_TODOS, todos: savedTodos });
    console.log('app');
  }, [savedTodos]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </AppContext.Provider>
  );
};

export default App;
