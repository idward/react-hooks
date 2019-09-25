import React, { FC, useState, SyntheticEvent, FormEvent } from 'react';

interface ILoginProps {
  [key: string]: any;
}

interface FormDataType {
  username: string;
  password: string;
}

type DataType<T> = T | null;

const Login: FC<ILoginProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userData, setUserData] = useState<DataType<FormDataType>>(null);

  const formSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data: FormDataType = {
      username,
      password,
    };

    setUserData(data);
    setUsername('');
    setPassword('');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      <form
        onSubmit={formSubmit}
        style={{
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event: SyntheticEvent<HTMLInputElement>) =>
            setUsername(event.currentTarget.value)
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event: SyntheticEvent<HTMLInputElement>) =>
            setPassword(event.currentTarget.value)
          }
        />
        <button type="submit">Login</button>
      </form>
      {userData && JSON.stringify(userData, null, 2)}
    </div>
  );
};

export default Login;
