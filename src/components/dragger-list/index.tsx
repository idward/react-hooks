import React, { FC, useState, DragEvent } from 'react';
import styles from '../../index.css';

interface IDragListProps {
  [key: string]: any;
}

const initialState = [1, 2, 3, 4, 5, 6];

const DragList: FC<IDragListProps> = () => {
  const [list, setList] = useState(initialState);

  const dragStartHandler = (event: DragEvent<HTMLLIElement>, index: number) => {
    console.log(event.currentTarget.id);
    const transferedData = JSON.stringify({ id: event.currentTarget.id, index });
    event.dataTransfer.setData('moveObj', transferedData);
  };

  const dropHander = (event: DragEvent<HTMLLIElement>, index: number) => {
    console.log(event.currentTarget.id);
    const transferedData = JSON.parse(event.dataTransfer.getData('moveObj'));
    console.log(transferedData);

    const newList = list.filter(item => item !== +transferedData.id);
    newList.splice(index, 0, +transferedData.id);
    setList(newList);
  };

  const dragOverHandler = (event: DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Drag and Drop</h1>
      <ul className={styles['drag-list']}>
        {list.map((l, i) => {
          return (
            <li
              key={`index-${i + 1}`}
              id={l.toString()}
              draggable
              onDragStart={(e: DragEvent<HTMLLIElement>) => dragStartHandler(e, i)}
              onDragOver={dragOverHandler}
              onDrop={(e: DragEvent<HTMLLIElement>) => dropHander(e, i)}>
              {l}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DragList;
