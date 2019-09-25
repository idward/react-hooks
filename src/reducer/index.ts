import { combineReducers } from 'redux';
import { TodosReducer, SelectTodoReducer } from './todo.reducer';

const rootReducer = combineReducers({
  todos: TodosReducer,
  currentTodo: SelectTodoReducer
});

export default rootReducer;
