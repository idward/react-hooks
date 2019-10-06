import { ReactionState, ReactionActions, ActionTypesEnum } from './type';

export const initialReactionState = {
  messages: [],
  username: 'anonymous',
};

const reactionReducer = (state: ReactionState, action: ReactionActions) => {
  switch (action.type) {
    case ActionTypesEnum.NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.item] };
    case ActionTypesEnum.SET_USERNAME:
      return { ...state, username: action.username };
    default:
      return state;
  }
};

export default reactionReducer;
