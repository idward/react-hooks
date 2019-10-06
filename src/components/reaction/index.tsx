import React, { FC, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import reducer, { initialReactionState } from './reducer';
import AppContext from './context';
import PublishMessage from './PublishMessage';
import MessageBoard from './MessageBoard';
import SetUsername from './SetUsername';
import PubSub from './pubsub';

interface IReactionProps {
  [key: string]: any;
}

const ReactionContainer = styled.div`
  margin: 5%;
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
`;

const H2 = styled.h2`
  font-family: 'Economica', sans-serif;
`;

const pubsub = new PubSub();

console.log(pubsub);

const Reaction: FC<IReactionProps> = () => {
  const [state, dispatch] = useReducer(reducer, initialReactionState);

  console.log('state: ', state);

  useEffect(() => {
    pubsub.addListener({
      message: (messageObj: any) => {
        const { channel, message } = messageObj;

        console.log('message: ', message, 'channel: ', channel);
        dispatch(message);
      },
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, pubsub }}>
      <ReactionContainer>
        <H2>Reaction</H2>
        <SetUsername />
        <hr />
        <PublishMessage />
        <hr />
        <MessageBoard />
      </ReactionContainer>
    </AppContext.Provider>
  );
};

export default Reaction;
