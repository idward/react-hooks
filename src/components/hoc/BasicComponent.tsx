import React, { FC } from 'react';

export interface IBasicCmpProps {
  [key: string]: any;
}

const BasicCmp: FC<IBasicCmpProps> = ({ firstName, lastName, color: nameColor }) => {
  return (
    <div>
      <h4 style={nameColor}>
        {firstName} - {lastName}
      </h4>
    </div>
  );
};

export default BasicCmp;
