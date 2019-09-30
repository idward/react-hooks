import React, { FC, useState, SyntheticEvent } from 'react';
import styles from '../../index.css';
import PICTURES from '../../data/pictures';
import { useDynamicTransition } from './hooks';

interface IGalleryProps {
  [key: string]: any;
}

const SECONDS = 1000;
const minimumDelay = 1000;

const Gallery: FC<IGalleryProps> = () => {
  const [delay, setDelay] = useState<number>(3 * SECONDS);
  const index = useDynamicTransition({ delay, length: PICTURES.length });

  const updateDelay = (event: SyntheticEvent<HTMLInputElement>) => {
    const normalDelay = Number(event.currentTarget.value) * SECONDS;

    setDelay(normalDelay < minimumDelay ? minimumDelay : normalDelay);
  };

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
