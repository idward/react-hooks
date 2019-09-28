import React, { FC, useState, SyntheticEvent } from 'react';
import styles from '../../index.css';
import Joke from './Joke';
import Stories from './Stories';
import Task from './Task';

interface IHackNewsProps {
  [key: string]: any;
}

const HackNews: FC<IHackNewsProps> = () => {
  const [userQuery, setUserQuery] = useState('');

  const updateUserQuery = (event: SyntheticEvent<HTMLInputElement>) => {
    setUserQuery(event.currentTarget.value);
    //   console.log(event.currentTarget.value);
  };

  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, '_blank');
  };

  return (
    <div>
      <h1>Hello David</h1>
      <div className={styles.form}>
        <input type="text" value={userQuery} onChange={updateUserQuery} />
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr />
      <Joke />
      <hr />
      <Task />
      <hr />
      <Stories />
    </div>
  );
};

export default HackNews;
