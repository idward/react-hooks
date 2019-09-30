import React, { FC, useState, useEffect } from 'react';
import MATRIX_FRAMES from '../../data/matrix';
import styles from '../../index.css';

interface IMatrixProps {
  [key: string]: any;
}

const Matrix: FC<IMatrixProps> = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => {
        return (prevIndex + 1) % MATRIX_FRAMES.length;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  console.log('Matrix render');

  return (
    <div className={styles.Matrix}>
      <img src={MATRIX_FRAMES[index]} alt="matrix-animation" />
    </div>
  );
};

export default Matrix;
