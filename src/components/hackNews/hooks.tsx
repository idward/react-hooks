import { useState, useEffect } from 'react';

export const useFetch = (endpoint: string, initialValue: any) => {
  const [data, setData] = useState(initialValue);

  // console.log('hooks data');

  useEffect(() => {
    // console.log('hooks effect');
    fetch(endpoint)
      .then(resp => resp.json())
      .then(json => setData(json));
  }, [endpoint]);

  return data;
};

export const useDynamicTransition = ({ delay, length }: { delay: number; length: number }) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = index + 1 !== length ? index + 1 : 0;
      setIndex(newIndex);
    }, delay);

    console.log('image changed: ', index);
    console.log('delay:', delay);

    return () => {
      clearInterval(intervalId);
    };
  }, [index, delay, length]);

  return index;
};
