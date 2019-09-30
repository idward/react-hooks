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
