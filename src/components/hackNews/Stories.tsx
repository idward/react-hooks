import React, { FC } from 'react';
import { useFetch } from './hooks';
import styles from '../../index.css';

interface IStorriesProps {
  [key: string]: any;
}

const Stories: FC<IStorriesProps> = () => {
  const stories = useFetch('https://news-proxy-server.appspot.com/topstories', []);

  console.log('Stories render');

  return (
    <div className={styles.Stories}>
      <h3>Stories</h3>
      {stories.map((story: any) => {
        const { id, by, time, title, url } = story;

        return (
          <div key={id}>
            <a href={url}>{title}</a>
            <div>
              {by} - {new Date(time * 1000).toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stories;
