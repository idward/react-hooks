import React, { FC } from 'react';
import GreenColor from './GreenColor';
import BasicCmp, { IBasicCmpProps } from './BasicComponent';

export interface IHighOrderProps {
  [key: string]: any;
}

const GreenColorCom: FC<IBasicCmpProps> = GreenColor(BasicCmp);

const HighOrder: FC<IHighOrderProps> = () => {
  return (
    <>
      <GreenColorCom firstName="Jacky" lastName="ma" />
      <GreenColorCom firstName="Sherry" lastName="lin" />
    </>
  );
};

export default HighOrder;
