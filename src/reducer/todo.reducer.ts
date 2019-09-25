export interface Todo {
  id?: string;
  text: string;
  complete: boolean;
}

export enum TodoConstant {
  'ADD_TODO' = 'ADD_TODO',
  'UPDATE_TODO' = 'UPDATE_TODO',
  'TOGGLE_TODO' = 'TOGGLE_TODO',
  'REMOVE_TODO' = 'REMOVE_TODO',
  'SET_CURRENT_TODO' = 'SET_CURRENT_TODO',
  'REMOVE_CURRENT_TODO' = 'REMOVE_CURRENT_TODO',
}

interface AddTodo {
  type: TodoConstant.ADD_TODO;
  todo: Todo;
}

interface UpdateTodo {
  type: TodoConstant.UPDATE_TODO;
  todo: Todo;
}

interface ToggleTodo {
  type: TodoConstant.TOGGLE_TODO;
  todo: Todo;
}

interface RemoveTodo {
  type: TodoConstant.REMOVE_TODO;
  todo: Todo;
}

interface SetCurrentTodo {
  type: TodoConstant.SET_CURRENT_TODO;
  currentTodo: Todo;
}

interface RemoveCurrentTodo {
  type: TodoConstant.REMOVE_CURRENT_TODO;
}

type TodoAction = AddTodo | UpdateTodo | ToggleTodo | RemoveTodo;
type SelectTodoAction = SetCurrentTodo | RemoveCurrentTodo;

export function TodosReducer(state: Todo[] = [], action: TodoAction) {
  switch (action.type) {
    case TodoConstant.ADD_TODO:
      return [...state, action.todo];
    case TodoConstant.UPDATE_TODO:
      return state.map((s: Todo) => {
        if (s.id === action.todo.id) {
          s = action.todo;
        }

        return s;
      });
    case TodoConstant.TOGGLE_TODO:
      return state.map((s: Todo) => {
        if (s.id === action.todo.id) {
          s.complete = !s.complete;
        }

        return s;
      });
    case TodoConstant.REMOVE_TODO:
      return state.filter((s: Todo) => {
        return s.id !== action.todo.id;
      });
    default:
      return state;
  }
}

export function SelectTodoReducer(state: Partial<Todo> = {}, action: SelectTodoAction) {
  switch (action.type) {
    case TodoConstant.SET_CURRENT_TODO:
      return { ...action.currentTodo };
    case TodoConstant.REMOVE_CURRENT_TODO:
      return {};
    default:
      return state;
  }
}
