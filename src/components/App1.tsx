import React, { FC, useState, useEffect } from 'react';

interface IAppProps {
  [key: string]: any;
}

interface PositionType<T> {
  x: T;
  y: T;
}

const App: FC<IAppProps> = () => {
  const [count, setCount] = useState<number>(0);
  const [isOn, setIsOn] = useState<boolean>(false);
  const [positon, setPosition] = useState<PositionType<number | null>>({ x: null, y: null });

  const increament = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleIsOn = () => {
    setIsOn(!isOn);
  };

  const handleMouseMove = (event: MouseEvent) => {
    setPosition({
      x: event.pageX,
      y: event.pageY,
    });
  };

  useEffect(() => {
    console.log('mouted');
    document.title = `You have been clicked ${count} times`;
    window.addEventListener('mousemove', handleMouseMove);

    // Call this func before every enter useEffect lifecyle
    // equal with the ComponentWillUnmount in class
    return () => {
      console.log('unmounted');
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [count]);

  console.log('data changed');

  return (
    <>
      <h2>Counter</h2>
      <button onClick={increament}>It is clicked {count} times</button>
      <h2>Toggle Light</h2>
      <div
        onClick={toggleIsOn}
        style={{
          background: isOn ? 'green' : 'grey',
          width: 100,
          height: 100,
        }}></div>
      <h2>Position</h2>
      {JSON.stringify(positon, null, 2)}
    </>
  );
};

export default App;
