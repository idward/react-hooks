import uuid from 'uuid';
import { ActionTypesEnum, NewMessageAction, UsernameAction } from './type';

export const newMessage = (text: string, username:string): NewMessageAction => {
  return {
    type: ActionTypesEnum.NEW_MESSAGE,
    item: { id: uuid.v4(), text, username, timestamp: Date.now() },
  };
};

export const setUsername = (username: string): UsernameAction => {
  return {
    type: ActionTypesEnum.SET_USERNAME,
    username,
  };
};
