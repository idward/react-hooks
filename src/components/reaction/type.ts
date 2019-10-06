export enum ActionTypesEnum {
  'NEW_MESSAGE' = 'NEW_MESSAGE',
  'SET_USERNAME' = 'SET_USERNAME',
}

export interface ItemType {
  id: string;
  text: string;
  username: string;
  timestamp: number;
}

export interface NewMessageAction {
  type: ActionTypesEnum.NEW_MESSAGE;
  item: ItemType;
}

export interface UsernameAction {
  type: ActionTypesEnum.SET_USERNAME;
  username: string;
}

export interface ReactionState {
  messages: ItemType[];
  username: string;
}

export type ReactionActions = NewMessageAction | UsernameAction;
