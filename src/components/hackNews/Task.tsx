import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
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

const STORE_DATA_KEY = 'STORE_DATA_KEY';

/**
 * save data to localstorage
 * @param dataMap
 */
const storeData = (dataMap: DataMap) => {
  localStorage.setItem(STORE_DATA_KEY, JSON.stringify(dataMap));
};

const readData = (): DataMap => {
  const data = localStorage.getItem(STORE_DATA_KEY);
  if (data) {
    return JSON.parse(data);
  }

  return { tasks: [], completedTasks: [] };
};

const Task: FC<ITaskProps> = () => {
  const initialData: DataMap = readData();
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState<TaskType[]>(initialData.tasks);
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>(initialData.completedTasks);

  const updateTask = (event: SyntheticEvent<HTMLInputElement>) => {
    setTaskText(event.currentTarget.value);
  };

  const addTask = () => {
    const newTask = { id: uuid.v4(), taskText };
    setTasks([...tasks, newTask]);
  };

  const completeTask = (completedTask: TaskType) => {
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(tasks.filter(t => t.id !== completedTask.id));
  };

  const deleteTask = (deletedTask: TaskType) => {
    setCompletedTasks(completedTasks.filter(t => t.id !== deletedTask.id));
  };

  // 数据持久化
  useEffect(() => {
    storeData({ tasks, completedTasks });
  }, [tasks, completedTasks]);

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
