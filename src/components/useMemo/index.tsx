import React, { FC, useState, useMemo } from 'react';
import Child from './Child';

interface IUseMemoProps {
  [key: string]: any;
}

const UseMemo: FC<IUseMemoProps> = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(count + 1);
  };

  const memoChild = useMemo(() => {
    return <Child />;
  }, []);

  return (
    <div>
      <h4>Count: {count}</h4>
      <button onClick={addCount}>Increment</button>
      <hr />
      <Child />
      <hr />
      {memoChild}
    </div>
  );
};

export default UseMemo;
