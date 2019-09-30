import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import styles from '../../index.css';
import PICTURES from '../../data/pictures';

interface IGalleryProps {
  [key: string]: any;
}

const SECONDS = 1000;
const minimumDelay = 1000;

const Gallery: FC<IGalleryProps> = () => {
  const [index, setIndex] = useState<number>(0);
  const [delay, setDelay] = useState<number>(3 * SECONDS);

  const updateDelay = (event: SyntheticEvent<HTMLInputElement>) => {
    const normalDelay = Number(event.currentTarget.value) * SECONDS;

    setDelay(normalDelay < minimumDelay ? minimumDelay : normalDelay);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = index + 1 !== PICTURES.length ? index + 1 : 0;
      setIndex(newIndex);
    }, delay);

    console.log('image changed: ', index);
    console.log('delay:', delay);

    return () => {
      clearInterval(intervalId);
    };
  }, [index, delay]);

  console.log('Gallery render');

  return (
    <div className={styles.Gallery}>
      <img src={PICTURES[index].image} alt="gallery" />
      <div className={styles.multiform}>
        <span>Gallery transition delay (seconds):</span>
        <div>
          <input type="number" onChange={updateDelay} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
