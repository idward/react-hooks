import React, { FC, useContext, useState, SyntheticEvent } from 'react';
import AppContext from './context';
import { setUsername } from './action';

interface ISetUsernameProps {
  [key: string]: any;
}

const SetUsername: FC<ISetUsernameProps> = () => {
  const [value, setValue] = useState('');
  const {
    state: { username },
    pubsub: { publish },
  } = useContext<any>(AppContext);

  const updateUsername = (event: SyntheticEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleUsername = (event: SyntheticEvent<HTMLInputElement>) => {
    if ((event as any).key === 'Enter') {
      publish(setUsername(value));
    }
  };

  return (
    <div>
      <h2>Username: {username}</h2>
      <input type="text" value={value} onChange={updateUsername} onKeyPress={handleUsername} />
    </div>
  );
};

export default SetUsername;
