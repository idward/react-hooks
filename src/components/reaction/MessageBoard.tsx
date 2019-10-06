import React, { FC } from 'react';
import { ItemType } from './type';
import { useAppContext } from './hooks';

interface IMessageBoardProps {
  [key: string]: any;
}

const MessageBoard: FC<IMessageBoardProps> = () => {
  const { state } = useAppContext();
  const { messages } = state;

  return (
    <div>
      {messages.map((message: ItemType) => {
        const { id, text, username, timestamp } = message;

        return (
          <div key={id}>
            <h4>{new Date(timestamp).toLocaleString()}</h4>
            <p>{text}</p>
            <h4>{username}</h4>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default MessageBoard;
