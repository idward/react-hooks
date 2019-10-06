import React, { FC, useState, SyntheticEvent } from 'react';
import { newMessage } from './action';
import { useAppContext } from './hooks';

interface IPublishMessageProps {
  [key: string]: any;
}

const PublishMessage: FC<IPublishMessageProps> = () => {
  const [text, setText] = useState('');
  const {
    state: { username },
    pubsub: { publish },
  } = useAppContext();

  const updateText = (event: SyntheticEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  const publishText = () => {
    publish(newMessage(text, username));
  };

  const onKeyPressHandler = (event: SyntheticEvent<HTMLInputElement>) => {
    if ((event as any).key === 'Enter') {
      publish(newMessage(text, username));
    }
  };

  return (
    <div>
      <h3>Got something to say</h3>
      <input type="text" value={text} onChange={updateText} onKeyPress={onKeyPressHandler} />
      <button onClick={publishText}>Publish it!</button>
    </div>
  );
};

export default PublishMessage;
