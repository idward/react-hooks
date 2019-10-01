import React, { FC, useState, useEffect, useReducer, SyntheticEvent } from 'react';
import uuid from 'uuid';
import styles from '../../index.css';

interface ITaskProps {
  [key: string]: any;
}

interface TaskType {
  id: string;
  taskText: string;
}

interface DataMap {
  tasks: TaskType[];
  completedTasks: TaskType[];
}

type TaskState = DataMap;

const initialTaskState: TaskState = {
  tasks: [],
  completedTasks: [],
};

const STORE_DATA_KEY = 'STORE_DATA_KEY';

/**
 * save data to localStorage
 * @param dataMap
 */
const storeData = (dataMap: DataMap) => {
  localStorage.setItem(STORE_DATA_KEY, JSON.stringify(dataMap));
};

/**
 * read data from localStorage
 */
const readData = (): DataMap => {
  const data = localStorage.getItem(STORE_DATA_KEY);
  if (data) {
    return JSON.parse(data);
  }

  return initialTaskState;
};

/**
 * Action
 */

enum TaskActionEnum {
  'ADD_TASK' = 'ADD_TASK',
  'COMPLETE_TASK' = 'COMPLETE_TASK',
  'DELETE_TASK' = 'DELETE_TASK',
}

interface AddTaskAction {
  type: TaskActionEnum.ADD_TASK;
  task: TaskType;
}

interface CompleteTaskAction {
  type: TaskActionEnum.COMPLETE_TASK;
  task: TaskType;
}

interface RemoveTaskAction {
  type: TaskActionEnum.DELETE_TASK;
  task: TaskType;
}

type TaskActions = AddTaskAction | CompleteTaskAction | RemoveTaskAction;

/**
 * taskReducer
 */
const taskReducer = (state: TaskState, action: TaskActions): TaskState => {
  switch (action.type) {
    case TaskActionEnum.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case TaskActionEnum.COMPLETE_TASK:
      return {
        ...state,
        completedTasks: [...state.completedTasks, action.task],
        tasks: state.tasks.filter(t => t.id !== action.task.id),
      };
    case TaskActionEnum.DELETE_TASK:
      return {
        ...state,
        completedTasks: state.completedTasks.filter(t => t.id !== action.task.id),
      };
    default:
      return state;
  }
};

const Task: FC<ITaskProps> = () => {
  const initialData: DataMap = readData();
  const [taskText, setTaskText] = useState('');
  // const [tasks, setTasks] = useState<TaskType[]>(initialData.tasks);
  // const [completedTasks, setCompletedTasks] = useState<TaskType[]>(initialData.completedTasks);
  const [state, dispatch] = useReducer(taskReducer, initialData);
  const { tasks, completedTasks } = state;

  const updateTask = (event: SyntheticEvent<HTMLInputElement>) => {
    setTaskText(event.currentTarget.value);
  };

  const addTask = () => {
    const newTask = { id: uuid.v4(), taskText };
    dispatch({ type: TaskActionEnum.ADD_TASK, task: newTask });
    setTaskText('');
    // setTasks([...tasks, newTask]);
  };

  const completeTask = (completedTask: TaskType) => {
    dispatch({ type: TaskActionEnum.COMPLETE_TASK, task: completedTask });
    // setCompletedTasks([...completedTasks, completedTask]);
    // setTasks(tasks.filter(t => t.id !== completedTask.id));
  };

  const deleteTask = (deletedTask: TaskType) => {
    dispatch({ type: TaskActionEnum.DELETE_TASK, task: deletedTask });
    // setCompletedTasks(completedTasks.filter(t => t.id !== deletedTask.id));
  };

  // 数据持久化
  useEffect(() => {
    storeData({ tasks, completedTasks });
  }, [tasks, completedTasks]);

  console.log('Task render');

  return (
    <div>
      <h3>Tasks</h3>
      <div className={styles.form}>
        <input type="text" value={taskText} onChange={updateTask} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className={styles['task-list']}>
        {tasks.map((task: TaskType) => {
          const { id, taskText: taskValue } = task;

          return (
            <div key={id} onClick={() => completeTask(task)}>
              {taskValue}
            </div>
          );
        })}
      </div>
      <div className={styles['completed-list']}>
        {completedTasks.map((task: TaskType) => {
          const { id, taskText: taskValue } = task;

          return (
            <div key={id}>
              {taskValue}
              <span className={styles['delete-task']} onClick={() => deleteTask(task)}>
                x
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Task;
