import React, { FC, useState, SyntheticEvent, FormEvent } from 'react';

interface IRegisterProps {
  [key: string]: any;
}

interface FormDataType {
  username: string;
  password: string;
  email: string;
}

type DataType<T> = T | null;

const initialData: FormDataType = {
  username: '',
  password: '',
  email: '',
};

const Login: FC<IRegisterProps> = () => {
  const [formData, setFormData] = useState<FormDataType>(initialData);
  const [userData, setUserData] = useState<DataType<FormDataType>>(null);

  const formSubmit = (event: FormEvent) => {
    event.preventDefault();

    setUserData(formData);
    setFormData(initialData);
  };

  const handleChanged = (event: SyntheticEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Register</h2>
      <form
        onSubmit={formSubmit}
        style={{
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChanged}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChanged}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChanged}
        />
        <button type="submit">Signup</button>
      </form>
      {userData && JSON.stringify(userData, null, 2)}
    </div>
  );
};

export default Login;
