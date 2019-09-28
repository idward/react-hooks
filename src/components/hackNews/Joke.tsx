import React, { FC } from 'react';
import { useFetch } from './hooks';

interface IJokeProps {
  [key: string]: any;
}

interface Joke {
  setup: string;
  punchline: string;
  [key: string]: any;
}

const Joke: FC<IJokeProps> = () => {
  const joke = useFetch('https://official-joke-api.appspot.com/jokes/random', {});

  const { setup, punchline } = joke;

  return (
    <div>
      <h3>Joke</h3>
      <p>{setup}</p>
      <p>
        <em>{punchline}</em>
      </p>
    </div>
  );
};

export default Joke;
