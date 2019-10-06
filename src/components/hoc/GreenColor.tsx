import React, { FC, Props } from 'react';

const GreenColorCmp = (BaseComponent: FC<any>) => (props: Props<any>) => {
  const addColor = { color: 'green' };

  const newProps = {
    ...props,
    color: addColor,
  };

  return <BaseComponent {...newProps} />;
};

export default GreenColorCmp;
