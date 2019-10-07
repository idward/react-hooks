import React, { FC, useEffect } from 'react';

interface IChildProps {
  [key: string]: any;
}

let renderCount = 0;

const Child: FC<IChildProps> = () => {
  useEffect(() => {
    renderCount += 1;
  });

  return (
    <div>
      <h4>ChildCount: {renderCount}</h4>
    </div>
  );
};

export default Child;
